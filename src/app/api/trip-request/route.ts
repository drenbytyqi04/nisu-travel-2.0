import { NextResponse } from "next/server";

/**
 * Trip request endpoint.
 *
 * ⚠️ DELIVERY IS NOT WIRED UP. This validates the payload and returns 200, but
 * it does not yet send the enquiry anywhere — no email provider, inbox or CRM
 * has been configured, and inventing one would silently drop real customers'
 * requests.
 *
 * To make it live, add ONE of these inside the marked block below:
 *   • Resend      — `await resend.emails.send({ ... })`
 *   • Nodemailer  — SMTP through your existing mailbox
 *   • A CRM/webhook — POST the payload onward
 *
 * Until then the form's "Send on WhatsApp instead" button is the working
 * conversion path, and it needs no backend at all.
 */

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  destination?: string;
  departure?: string;
  ret?: string;
  travellers?: string;
  type?: string;
  budget?: string;
  message?: string;
};

const MAX = 4000;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const destination = body.destination?.trim() ?? "";

  // Mirror the client rules; never trust the browser to have run them.
  if (!name || !destination || (!email && !phone)) {
    return NextResponse.json(
      { error: "Name, destination and one contact method are required." },
      { status: 422 },
    );
  }

  if (JSON.stringify(body).length > MAX) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  // ---------------------------------------------------------------
  // TODO: deliver the enquiry here. Until this is implemented the
  // request is acknowledged but goes nowhere.
  // ---------------------------------------------------------------
  console.info("[trip-request] received", {
    name,
    destination,
    travellers: body.travellers,
    hasEmail: Boolean(email),
    hasPhone: Boolean(phone),
  });

  return NextResponse.json({ ok: true, delivered: false });
}
