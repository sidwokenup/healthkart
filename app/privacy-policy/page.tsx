import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Medsforpain Online Pharmacy USA",
  description:
    "Read the Privacy Policy of Medsforpain, a trusted online pharmacy in the USA. Learn how we collect, use, and protect your personal and health information in compliance with HIPAA and US data protection laws."
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Effective Date: October 26, 2023
          </p>

          <div className="prose prose-blue max-w-none text-gray-700 space-y-8">
            {/* 1. INTRODUCTION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to Medsforpain ("we," "our," or "us"). We are committed
                to protecting your privacy and ensuring the security of your
                personal and health information. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information
                when you visit our website and use our services.
              </p>
              <p className="mt-2">
                This policy applies to all users in the United States. By
                accessing or using our services, you agree to the terms of this
                Privacy Policy.
              </p>
            </section>

            {/* 2. INFORMATION WE COLLECT */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                2. Information We Collect
              </h2>
              <p>
                We collect information that identifies, relates to, describes,
                references, is capable of being associated with, or could
                reasonably be linked, directly or indirectly, with a particular
                consumer or device.
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    A. Personal Information
                  </h3>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Name, email address, and phone number.</li>
                    <li>Shipping and billing addresses.</li>
                    <li>Account credentials (username and password).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    B. Health Information
                  </h3>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Prescription details and images uploaded for verification.
                    </li>
                    <li>
                      Medical history or health information you voluntarily
                      provide during consultations or checkout.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    C. Payment Information
                  </h3>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Payment card details are processed secure third-party
                      payment processors.
                    </li>
                    <li>
                      We do not store your full credit card number or CVV on our
                      servers.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    D. Automatically Collected Information
                  </h3>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>IP address, browser type, and operating system.</li>
                    <li>Device information and unique device identifiers.</li>
                    <li>
                      Browsing history and interaction with our website (via
                      cookies).
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. HOW WE USE YOUR INFORMATION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  To process and fulfill your orders for medications and health
                  products.
                </li>
                <li>
                  To verify prescriptions with licensed pharmacy partners.
                </li>
                <li>To provide customer support and respond to inquiries.</li>
                <li>
                  To comply with applicable laws, regulations, and legal
                  processes.
                </li>
                <li>
                  To prevent fraud, unauthorized transactions, and security
                  breaches.
                </li>
                <li>
                  To improve our website functionality and user experience.
                </li>
                <li>
                  To send transactional emails (order confirmations, shipping
                  updates).
                </li>
                <li>
                  To send marketing communications (only if you have opted in),
                  which you can opt-out of at any time.
                </li>
              </ul>
            </section>

            {/* 4. HIPAA & HEALTH INFORMATION PROTECTION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                4. HIPAA & Health Information Protection
              </h2>
              <p>
                We understand the sensitivity of your health information. While
                we may or may not be a covered entity under the Health Insurance
                Portability and Accountability Act (HIPAA) depending on specific
                services, we implement robust safeguards consistent with HIPAA
                standards to protect your Protected Health Information (PHI).
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  We use secure, encrypted channels for transmitting health
                  data.
                </li>
                <li>
                  Access to health information is strictly limited to authorized
                  personnel and licensed healthcare partners.
                </li>
                <li>
                  We maintain appropriate administrative, technical, and
                  physical safeguards to prevent unauthorized access or
                  disclosure.
                </li>
              </ul>
            </section>

            {/* 5. SHARING OF INFORMATION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                5. Sharing of Information
              </h2>
              <p>
                We do not sell your personal information. We may share your
                information with:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Licensed Pharmacy Partners:</strong> To fulfill
                  prescription orders and ensure clinical safety.
                </li>
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who
                  assist with payment processing, shipping (e.g., USPS, FedEx,
                  UPS), and data hosting.
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law,
                  court order, or government regulation to protect our rights or
                  the safety of others.
                </li>
              </ul>
            </section>

            {/* 6. COOKIES & TRACKING TECHNOLOGIES */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                6. Cookies & Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to enhance your
                browsing experience, analyze site traffic, and understand user
                behavior.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for the website
                  to function (e.g., shopping cart items).
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors interact with our site.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant
                  advertisements (you can opt-out).
                </li>
              </ul>
              <p className="mt-2">
                You can control cookie preferences through your browser
                settings. However, disabling cookies may affect certain website
                functionalities.
              </p>
            </section>

            {/* 7. CALIFORNIA PRIVACY RIGHTS */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                7. California Privacy Rights (CCPA/CPRA)
              </h2>
              <p>
                If you are a California resident, you have specific rights
                regarding your personal information under the CCPA/CPRA:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Right to Know:</strong> You can request details about
                  the personal information we collect and how it is used.
                </li>
                <li>
                  <strong>Right to Delete:</strong> You can request the deletion
                  of your personal information, subject to certain legal
                  exceptions (e.g., pharmacy record retention requirements).
                </li>
                <li>
                  <strong>Right to Correct:</strong> You can request corrections
                  to inaccurate personal information.
                </li>
                <li>
                  <strong>Right to Opt-Out:</strong> You have the right to
                  opt-out of the sale or sharing of personal information (we do
                  not sell your data).
                </li>
                <li>
                  <strong>Non-Discrimination:</strong> We will not discriminate
                  against you for exercising your privacy rights.
                </li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:support@medsforpain.com"
                  className="text-primary hover:underline"
                >
                  support@medsforpain.com
                </a>
                .
              </p>
            </section>

            {/* 8. DATA SECURITY */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                8. Data Security
              </h2>
              <p>
                We employ industry-standard security measures to protect your
                data, including Secure Socket Layer (SSL) encryption for data
                transmission, secure servers, firewalls, and strict access
                controls. While we strive to use commercially acceptable means
                to protect your personal information, no method of transmission
                over the Internet is 100% secure.
              </p>
            </section>

            {/* 9. DATA RETENTION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                9. Data Retention
              </h2>
              <p>
                We retain your personal and health information only as long as
                necessary to fulfill the purposes outlined in this policy or as
                required by law (e.g., pharmacy record-keeping regulations).
                When data is no longer needed, we securely delete or anonymize
                it.
              </p>
            </section>

            {/* 10. CHILDREN'S PRIVACY */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                10. Children's Privacy
              </h2>
              <p>
                Our services are not intended for individuals under the age of
                13. We do not knowingly collect personal information from
                children. If we become aware that we have collected data from a
                child under 13, we will take steps to delete it immediately in
                compliance with COPPA.
              </p>
            </section>

            {/* 11. THIRD-PARTY LINKS */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                11. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                external sites. We encourage you to review the privacy policies
                of any third-party sites you visit.
              </p>
            </section>

            {/* 12. YOUR RIGHTS & CHOICES */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                12. Your Rights & Choices
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Access and review your personal information.</li>
                <li>Update or correct your account details.</li>
                <li>
                  Request deletion of your account (subject to legal retention
                  obligations).
                </li>
                <li>
                  Opt-out of marketing communications via the "unsubscribe" link
                  in emails.
                </li>
              </ul>
            </section>

            {/* 13. CHANGES TO THIS POLICY */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                13. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                you of any material changes by posting the new policy on this
                page with an updated effective date.
              </p>
            </section>

            {/* 14. CONTACT INFORMATION */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                14. Contact Information
              </h2>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us:
              </p>
              <div className="mt-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="font-bold text-gray-900">Medsforpain</p>
                <p className="mt-1">
                  Email:{" "}
                  <a
                    href="mailto:support@medsforpain.com"
                    className="text-primary hover:underline"
                  >
                    support@medsforpain.com
                  </a>
                </p>
                <p className="mt-1">Phone: +13122483163</p>
                <p className="mt-1">
                  Address: 123 Health Street, Medical District, Tech City, USA
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
