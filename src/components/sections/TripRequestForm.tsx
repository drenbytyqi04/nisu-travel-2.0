"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, TriangleAlert } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { packages } from "@/content/packages";
import { destinations } from "@/content/destinations";

const travelTypes = [
  "Family holiday",
  "Couple getaway",
  "Group travel",
  "Business travel",
  "Diaspora / family visit",
  "Not sure yet",
];

const budgets = [
  "Prefer not to say",
  "Up to €500 per person",
  "€500–€1,000 per person",
  "€1,000–€2,000 per person",
  "€2,000+ per person",
];

type Values = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  departure: string;
  ret: string;
  travellers: string;
  type: string;
  budget: string;
  message: string;
};

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  departure: "",
  ret: "",
  travellers: "2",
  type: travelTypes[0],
  budget: budgets[0],
  message: "",
};

function validate(v: Values) {
  const errors: Partial<Record<keyof Values, string>> = {};

  if (!v.name.trim()) errors.name = "Please tell us your name.";

  if (!v.email.trim() && !v.phone.trim()) {
    errors.email = "Add an email address or a phone number so we can reply.";
  } else if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    errors.email = "That email address does not look complete.";
  }

  if (!v.destination.trim()) {
    errors.destination = "Where would you like to go? A region is enough.";
  }

  const travellers = Number(v.travellers);
  if (!Number.isFinite(travellers) || travellers < 1) {
    errors.travellers = "Enter how many people are travelling.";
  }

  if (v.departure && v.ret && v.ret < v.departure) {
    errors.ret = "The return date is before the departure date.";
  }

  return errors;
}

/** Composes the enquiry into a WhatsApp message, so it works with no backend. */
function toMessage(v: Values) {
  return [
    "Hello Nisu Travel, I'm interested in planning a trip.",
    "",
    `Name: ${v.name}`,
    v.email && `Email: ${v.email}`,
    v.phone && `Phone: ${v.phone}`,
    `Destination: ${v.destination}`,
    v.departure && `Departure: ${v.departure}`,
    v.ret && `Return: ${v.ret}`,
    `Travellers: ${v.travellers}`,
    `Travel type: ${v.type}`,
    v.budget && `Budget: ${v.budget}`,
    v.message && `Notes: ${v.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function TripRequestForm({
  defaultDestination = "",
  defaultPackage = "",
}: {
  defaultDestination?: string;
  defaultPackage?: string;
}) {
  const preset =
    packages.find((p) => p.slug === defaultPackage)?.title ?? "";

  const [values, setValues] = useState<Values>({
    ...empty,
    destination: defaultDestination,
    message: preset ? `I'm interested in the ${preset} package.` : "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear an error as soon as the field is corrected.
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Validate on blur, not on keystroke.
  const blur = (key: keyof Values) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    const next = validate(values);
    setErrors((e) => ({ ...e, [key]: next[key] }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(
      Object.fromEntries(Object.keys(values).map((k) => [k, true])) as Record<
        keyof Values,
        boolean
      >,
    );

    if (Object.keys(found).length > 0) {
      // Multiple errors: send focus to the summary, which links to each field.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/trip-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const errorList = (Object.entries(errors) as [keyof Values, string][]).filter(
    ([, message]) => Boolean(message),
  );

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-plate border border-jade/40 bg-jade/5 p-10 text-center sm:p-14"
        role="status"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-jade text-ink">
          <Check className="size-7" aria-hidden="true" />
        </span>
        <p className="balance mt-7 font-display text-3xl text-paper">
          Your journey starts here.
        </p>
        <p className="pretty mx-auto mt-4 max-w-md text-base leading-relaxed text-paper-dim">
          We&rsquo;ll be in touch shortly. If it is urgent, WhatsApp is the
          fastest way to reach us.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <WhatsAppLink message={toMessage(values)} label="Continue on WhatsApp" />
          <Button
            variant="ghost"
            onClick={() => {
              setValues(empty);
              setStatus("idle");
              setTouched({});
            }}
          >
            Send another request
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="min-w-0">
      <AnimatePresence>
        {errorList.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="mb-8 rounded-card border border-red-400/40 bg-red-400/5 p-5 focus:outline-none focus-visible:outline-2 focus-visible:outline-jade"
          >
            <p className="flex items-center gap-2 text-sm font-medium text-red-200">
              <TriangleAlert className="size-4" aria-hidden="true" />
              Please check {errorList.length} fields before sending.
            </p>
            <ul className="mt-3 space-y-1.5">
              {errorList.map(([key, message]) => (
                <li key={key}>
                  <a
                    href={`#field-${key}`}
                    className="text-sm text-red-200 underline underline-offset-4 hover:text-red-100"
                  >
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="field-name" label="Name" required error={touched.name ? errors.name : undefined}>
          <Input
            id="field-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            onBlur={blur("name")}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={errors.name ? "field-name-error" : undefined}
          />
        </Field>

        <Field
          id="field-email"
          label="Email"
          hint="Email or phone — whichever you prefer we use."
          error={touched.email ? errors.email : undefined}
        >
          <Input
            id="field-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            onBlur={blur("email")}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={errors.email ? "field-email-error" : "field-email-hint"}
          />
        </Field>

        <Field id="field-phone" label="Phone">
          <Input
            id="field-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
          />
        </Field>

        <Field
          id="field-destination"
          label="Destination"
          required
          hint="A city, a country, or just “somewhere warm”."
          error={touched.destination ? errors.destination : undefined}
        >
          <Input
            id="field-destination"
            name="destination"
            list="destination-suggestions"
            value={values.destination}
            onChange={(e) => set("destination")(e.target.value)}
            onBlur={blur("destination")}
            aria-invalid={Boolean(touched.destination && errors.destination)}
            aria-describedby={
              errors.destination ? "field-destination-error" : "field-destination-hint"
            }
          />
          <datalist id="destination-suggestions">
            {destinations.map((d) => (
              <option key={d.slug} value={`${d.name}, ${d.country}`} />
            ))}
          </datalist>
        </Field>

        <Field id="field-departure" label="Departure date">
          <Input
            id="field-departure"
            name="departure"
            type="date"
            value={values.departure}
            onChange={(e) => set("departure")(e.target.value)}
          />
        </Field>

        <Field id="field-ret" label="Return date" error={touched.ret ? errors.ret : undefined}>
          <Input
            id="field-ret"
            name="ret"
            type="date"
            min={values.departure || undefined}
            value={values.ret}
            onChange={(e) => set("ret")(e.target.value)}
            onBlur={blur("ret")}
            aria-invalid={Boolean(touched.ret && errors.ret)}
            aria-describedby={errors.ret ? "field-ret-error" : undefined}
          />
        </Field>

        <Field
          id="field-travellers"
          label="Number of travellers"
          required
          error={touched.travellers ? errors.travellers : undefined}
        >
          <Input
            id="field-travellers"
            name="travellers"
            type="number"
            inputMode="numeric"
            min={1}
            max={99}
            value={values.travellers}
            onChange={(e) => set("travellers")(e.target.value)}
            onBlur={blur("travellers")}
            aria-invalid={Boolean(touched.travellers && errors.travellers)}
            aria-describedby={errors.travellers ? "field-travellers-error" : undefined}
          />
        </Field>

        <Field id="field-type" label="Travel type">
          <Select
            id="field-type"
            name="type"
            value={values.type}
            onChange={(e) => set("type")(e.target.value)}
          >
            {travelTypes.map((t) => (
              <option key={t} value={t} className="bg-ink-2">
                {t}
              </option>
            ))}
          </Select>
        </Field>

        <Field id="field-budget" label="Budget" className="sm:col-span-2">
          <Select
            id="field-budget"
            name="budget"
            value={values.budget}
            onChange={(e) => set("budget")(e.target.value)}
          >
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-ink-2">
                {b}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          id="field-message"
          label="Message"
          hint="Anything that would help — occasion, flexibility, who is travelling."
          className="sm:col-span-2"
        >
          <Textarea
            id="field-message"
            name="message"
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
            aria-describedby="field-message-hint"
          />
        </Field>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 flex items-center gap-2 text-sm text-red-200">
          <TriangleAlert className="size-4" aria-hidden="true" />
          Something went wrong sending that. Please try again, or reach us on
          WhatsApp.
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Request"}
        </Button>
        <WhatsAppLink
          variant="outline"
          size="lg"
          message={toMessage(values)}
          label="Send on WhatsApp instead"
        />
      </div>

      <p className="pretty mt-6 max-w-lg text-xs leading-relaxed text-paper-faint">
        We use your details only to answer your enquiry. No prices or
        availability are confirmed until we come back to you in writing.
      </p>
    </form>
  );
}
