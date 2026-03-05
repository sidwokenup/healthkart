import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Medsforpain Online Pharmacy USA",
  description:
    "Read the Terms and Conditions for using Medsforpain, a trusted online pharmacy in the USA. Learn about prescription requirements, user responsibilities, payment terms, and legal compliance."
};

export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Effective Date: October 26, 2023
          </p>

          <div className="prose prose-blue max-w-none text-gray-700 space-y-8">
            {/* 1. ACCEPTANCE OF TERMS */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, or using the Medsforpain website
                ("Site") and services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms and Conditions
                ("Terms"). If you do not agree to these Terms, you must not use
                this Site.
              </p>
            </section>

            {/* 2. ELIGIBILITY */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                2. Eligibility
              </h2>
              <p>
                You must be at least 18 years of age and a resident of the
                United States to use this Site. By using this Site, you
                represent and warrant that you meet these eligibility
                requirements and have the legal capacity to enter into binding
                contracts. We do not provide services to individuals outside the
                United States.
              </p>
            </section>

            {/* 3. PRESCRIPTION REQUIREMENT */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                3. Prescription Requirement
              </h2>
              <p>
                The sale of prescription medications ("Rx Products") requires a
                valid prescription issued by a licensed healthcare provider in
                the United States.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  You must upload a valid copy of your prescription or authorize
                  us to contact your prescriber for verification.
                </li>
                <li>
                  We reserve the right to verify the authenticity of any
                  prescription prior to fulfillment.
                </li>
                <li>
                  Orders will be cancelled if a valid prescription cannot be
                  verified.
                </li>
                <li>
                  We strictly adhere to federal and state laws and will not
                  dispense controlled substances or prescription-only drugs
                  without a valid prescription.
                </li>
              </ul>
            </section>

            {/* 4. NO MEDICAL ADVICE DISCLAIMER */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                4. No Medical Advice Disclaimer
              </h2>
              <p>
                The content provided on this Site, including text, graphics,
                images, and other materials, is for informational purposes only
                and is not a substitute for professional medical advice,
                diagnosis, or treatment.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Always seek the advice of your physician or other qualified
                  health provider with any questions you may have regarding a
                  medical condition.
                </li>
                <li>
                  Never disregard professional medical advice or delay in
                  seeking it because of something you have read on this Site.
                </li>
                <li>
                  Use of this Site does not create a doctor-patient or
                  provider-patient relationship between you and Medsforpain.
                </li>
              </ul>
            </section>

            {/* 5. ORDER ACCEPTANCE & CANCELLATION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                5. Order Acceptance & Cancellation
              </h2>
              <p>
                Your receipt of an electronic or other form of order
                confirmation does not signify our acceptance of your order. We
                reserve the right at any time after receipt of your order to
                accept, decline, or limit your order for any reason.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  We reserve the right to cancel orders due to pricing errors,
                  stock unavailability, or suspicion of fraud.
                </li>
                <li>
                  If your order is cancelled after your payment method has been
                  charged, we will issue a refund to the original payment
                  method.
                </li>
              </ul>
            </section>

            {/* 6. PAYMENT TERMS */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                6. Payment Terms
              </h2>
              <p>
                Payments are processed via secure third-party payment
                processors. You represent and warrant that you have the legal
                right to use any credit card or other payment method used in
                connection with any transaction.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  You agree to pay all charges incurred by you or users of your
                  account at the prices in effect when such charges are
                  incurred.
                </li>
                <li>
                  You are responsible for paying any applicable taxes relating
                  to your purchases.
                </li>
              </ul>
            </section>

            {/* 7. SHIPPING & DELIVERY */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                7. Shipping & Delivery
              </h2>
              <p>
                We ship products only to addresses within the United States.
                Shipping and delivery dates are estimates only and cannot be
                guaranteed. We are not liable for any delays in shipments. Risk
                of loss and title for items purchased from this Site pass to you
                upon delivery of the items to the carrier.
              </p>
            </section>

            {/* 8. USER RESPONSIBILITIES */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                8. User Responsibilities
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Use medications for any purpose other than as prescribed or
                  indicated.
                </li>
                <li>
                  Resell or distribute medications purchased from this Site.
                </li>
                <li>
                  Provide false or misleading information, including fraudulent
                  prescriptions.
                </li>
                <li>
                  Use the Site for any unlawful purpose or in violation of any
                  local, state, or federal law.
                </li>
              </ul>
            </section>

            {/* 9. PROHIBITED ACTIVITIES */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                9. Prohibited Activities
              </h2>
              <p>
                You are prohibited from violating or attempting to violate the
                security of the Site, including, without limitation:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Accessing data not intended for you or logging onto a server
                  or an account which you are not authorized to access.
                </li>
                <li>
                  Attempting to probe, scan, or test the vulnerability of a
                  system or network or to breach security or authentication
                  measures without proper authorization.
                </li>
                <li>
                  Using any device, software, or routine to interfere or attempt
                  to interfere with the proper working of the Site.
                </li>
              </ul>
            </section>

            {/* 10. INTELLECTUAL PROPERTY */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                10. Intellectual Property
              </h2>
              <p>
                All content included on this Site, such as text, graphics,
                logos, images, and software, is the property of Medsforpain or
                its content suppliers and is protected by United States and
                international copyright laws. You may not reproduce, modify,
                distribute, or republish materials from this Site without our
                prior written permission.
              </p>
            </section>

            {/* 11. LIMITATION OF LIABILITY */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                11. Limitation of Liability
              </h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, MEDSFORPAIN SHALL NOT BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
                INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
                GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR
                ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SITE; (B)
                ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SITE; OR (C)
                UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR
                CONTENT.
              </p>
              <p className="mt-2">
                IN NO EVENT SHALL OUR AGGREGATE LIABILITY EXCEED THE AMOUNT YOU
                PAID US, IF ANY, IN THE PAST SIX MONTHS FOR THE PRODUCTS GIVING
                RISE TO THE CLAIM.
              </p>
            </section>

            {/* 12. INDEMNIFICATION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                12. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless Medsforpain,
                its officers, directors, employees, agents, licensors, and
                suppliers from and against all losses, expenses, damages, and
                costs, including reasonable attorneys' fees, resulting from any
                violation of these Terms or any activity related to your account
                (including negligent or wrongful conduct) by you or any other
                person accessing the Site using your Internet account.
              </p>
            </section>

            {/* 13. PRIVACY REFERENCE */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                13. Privacy
              </h2>
              <p>
                Your use of the Site is also governed by our{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </a>
                . Please review our Privacy Policy to understand our practices
                regarding the collection and use of your information, including
                HIPAA-compliant safeguards for protected health information.
              </p>
            </section>

            {/* 14. GOVERNING LAW */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                14. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the United States and the State of [Insert
                State], without regard to its conflict of law principles.
              </p>
            </section>

            {/* 15. DISPUTE RESOLUTION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                15. Dispute Resolution
              </h2>
              <p>
                Any dispute arising out of or relating to these Terms or the
                Site shall be resolved through binding arbitration in [Insert
                State], USA, except that you may assert claims in small claims
                court if your claims qualify. You agree to waive any right to
                participate in a class action lawsuit or class-wide arbitration.
              </p>
            </section>

            {/* 16. TERMINATION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                16. Termination
              </h2>
              <p>
                We reserve the right to terminate or suspend your account and
                access to the Site at our sole discretion, without notice, for
                conduct that we believe violates these Terms or is harmful to
                other users, us, or third parties, or for any other reason.
              </p>
            </section>

            {/* 17. CHANGES TO TERMS */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                17. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Your
                continued use of the Site following the posting of changes will
                mean that you accept and agree to the changes. It is your
                responsibility to check these Terms periodically for changes.
              </p>
            </section>

            {/* 18. CONTACT INFORMATION */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                18. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms, please contact us:
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
