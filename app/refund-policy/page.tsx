import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Returns Policy | Medsforpain Online Pharmacy USA",
  description:
    "Learn about Medsforpain’s Refund and Returns Policy. Understand how prescription medications, OTC products, and medical supplies are handled under US pharmacy regulations."
};

export default function RefundPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Refund & Returns Policy
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
                At Medsforpain, we are committed to customer satisfaction and
                ensuring you receive high-quality, authentic medications and
                healthcare products. This Refund & Returns Policy outlines our
                procedures for handling returns, refunds, and replacements in
                compliance with applicable United States pharmacy regulations
                and federal laws.
              </p>
            </section>

            {/* 2. NO RETURNS ON MEDICATIONS */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                2. No Returns on Medications
              </h2>
              <p>
                Due to strict health and safety regulations enforced by the FDA
                and state pharmacy boards,{" "}
                <strong>
                  we cannot accept returns on prescription medications once they
                  have been dispensed and shipped from our pharmacy facility.
                </strong>
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Prescription drugs are legally non-returnable for resale or
                  reuse once they have left the control of the pharmacy.
                </li>
                <li>
                  Over-the-counter (OTC) medications and health products are
                  also non-returnable once opened or if the tamper-evident seal
                  is broken, to ensure product integrity and patient safety.
                </li>
                <li>
                  This policy protects all our customers by ensuring that every
                  product you receive has been stored and handled under strict
                  quality control conditions.
                </li>
              </ul>
            </section>

            {/* 3. EXCEPTIONS (ELIGIBLE FOR REFUND OR REPLACEMENT) */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                3. Exceptions (Eligible for Refund or Replacement)
              </h2>
              <p>
                While general returns are not permitted, we will provide a full
                refund or replacement under the following specific
                circumstances:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Incorrect Product:</strong> If you received a
                  medication or product different from what you ordered or
                  prescribed.
                </li>
                <li>
                  <strong>Damaged Product:</strong> If the product arrived
                  damaged or the packaging was compromised during transit.
                </li>
                <li>
                  <strong>Expired Product:</strong> If you received a product
                  that is past its expiration date.
                </li>
                <li>
                  <strong>Lost in Transit:</strong> If your order has been
                  confirmed lost by the shipping carrier.
                </li>
                <li>
                  <strong>Billing Errors:</strong> If you were charged
                  incorrectly or charged for a duplicate order.
                </li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Requirement:</strong> You must contact our support team
                within <strong>48 hours</strong> of delivery to report any of
                these issues. Proof (such as photographs or order details) may
                be required.
              </p>
            </section>

            {/* 4. DAMAGED OR INCORRECT ITEMS */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                4. Damaged or Incorrect Items
              </h2>
              <p>
                If you believe you have received a damaged, defective, or
                incorrect item, please follow these steps immediately:
              </p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Do not consume or use the medication/product.</li>
                <li>Keep the original packaging and all labels intact.</li>
                <li>
                  Take clear photographs of the product, the packaging, and the
                  shipping label.
                </li>
                <li>
                  Contact us at{" "}
                  <a
                    href="mailto:support@medsforpain.com"
                    className="text-primary hover:underline"
                  >
                    support@medsforpain.com
                  </a>{" "}
                  with your Order ID and the photographs.
                </li>
              </ol>
              <p className="mt-2">
                Upon verification, we will arrange for a replacement shipment at
                no additional cost to you, or issue a full refund to your
                original payment method.
              </p>
            </section>

            {/* 5. ORDER CANCELLATION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                5. Order Cancellation
              </h2>
              <p>
                You may request to cancel your order for a full refund{" "}
                <strong>
                  only if the order has not yet been processed by our pharmacy.
                </strong>
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Once a prescription has been verified and the medication has
                  been dispensed or packed for shipping, the order cannot be
                  cancelled or refunded.
                </li>
                <li>
                  If you wish to cancel, please contact us immediately. We will
                  make every effort to stop the order if it is still in the
                  pre-processing stage.
                </li>
              </ul>
            </section>

            {/* 6. REFUND PROCESS */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                6. Refund Process
              </h2>
              <p>If your refund request is approved:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Refunds will be processed to the original method of payment
                  used for the purchase.
                </li>
                <li>
                  Please allow <strong>5–10 business days</strong> for the
                  credit to appear on your statement, depending on your bank or
                  credit card issuer's processing timelines.
                </li>
                <li>
                  We will send you an email confirmation once the refund has
                  been initiated.
                </li>
              </ul>
            </section>

            {/* 7. NON-REFUNDABLE ITEMS */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                7. Non-Refundable Items
              </h2>
              <p>
                The following items are strictly non-refundable and
                non-returnable:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Any prescription medication once dispensed.</li>
                <li>
                  Opened over-the-counter (OTC) medications, vitamins, or
                  supplements.
                </li>
                <li>Used medical supplies or devices.</li>
                <li>
                  Temperature-sensitive items (e.g., insulin) that require cold
                  chain storage.
                </li>
                <li>Clearance or final sale items.</li>
              </ul>
            </section>

            {/* 8. SHIPPING FEES */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                8. Shipping Fees
              </h2>
              <p>
                Shipping fees are non-refundable unless the return is due to an
                error on our part (e.g., we shipped the wrong item). If you are
                eligible for a return of non-medication items, you may be
                responsible for return shipping costs, which will be deducted
                from your refund.
              </p>
            </section>

            {/* 9. FRAUD PREVENTION */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                9. Fraud Prevention
              </h2>
              <p>
                We reserve the right to deny refunds or replacements if we
                suspect fraudulent activity, abuse of our return policy, or
                false claims regarding missing or damaged items. Repeated false
                claims may result in the suspension or termination of your
                account.
              </p>
            </section>

            {/* 10. CONTACT INFORMATION */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                10. Contact Information
              </h2>
              <p>
                If you have any questions about our Refund & Returns Policy,
                please contact our support team:
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
