import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white text-black pt-32 sm:pt-36 md:pt-40 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-8 sm:mb-12 text-center">
          Terms of Service
        </h1>

        <div className="h-0.5 w-24 bg-black mx-auto mb-12"></div>

        <section className="space-y-10">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 border-b border-gray-200 pb-2">
              OVERVIEW
            </h2>
            <p className="text-gray-800 leading-relaxed">
              This website is operated by Essancia Fashion. Throughout the site,
              the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo;
              refer to Essancia Fashion. Essancia Fashion offers this website,
              including all information, tools and Services available from this
              site to you, the user, conditioned upon your acceptance of all
              terms, conditions, policies and notices stated here.
            </p>
          </div>

          <div className="text-gray-800 leading-relaxed space-y-6">
            <p>
              By visiting our site and/or purchasing something from us, you
              engage in our &ldquo;Service&rdquo; and agree to be bound by the
              following terms and conditions (&ldquo;Terms of Service&rdquo;,
              &ldquo;Terms&rdquo;), including those additional terms and
              conditions and policies referenced herein and/or available by
              hyperlink. These Terms of Service apply to all users of the site,
              including without limitation users who are browsers, vendors,
              customers, merchants, and/or contributors of content.
            </p>

            <p>
              Please read these Terms of Service carefully before accessing or
              using our website. By accessing or using any part of the site, you
              agree to be bound by these Terms of Service. If you do not agree
              to all the terms and conditions of this agreement, then you may
              not access the website or use any Services. If these Terms of
              Service are considered an offer, acceptance is expressly limited
              to these Terms of Service.
            </p>

            <p>
              Any new features or tools which are added to the current store
              shall also be subject to the Terms of Service. You can review the
              most current version of the Terms of Service at any time on this
              page. We reserve the right to update, change or replace any part
              of these Terms of Service by posting updates and/or changes to our
              website. It is your responsibility to check this page periodically
              for changes. Your continued use of or access to the website
              following the posting of any changes constitutes acceptance of
              those changes.
            </p>

            <p>
              Our store is hosted on Vercel. They provide us with the online
              e-commerce platform that allows us to sell our products and
              Services to you.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 border-b border-gray-200 pb-2">
              SECTION 1 - ONLINE STORE TERMS
            </h2>
            <div className="text-gray-800 leading-relaxed space-y-4">
              <p>
                By agreeing to these Terms of Service, you represent that you
                are at least the age of majority in your state or province of
                residence, or that you are the age of majority in your state or
                province of residence and you have given us your consent to
                allow any of your minor dependents to use this site.
              </p>
              <p>
                You may not use our products for any illegal or unauthorized
                purpose nor may you, in the use of the Service, violate any laws
                in your jurisdiction (including but not limited to copyright
                laws).
              </p>
              <p>
                You must not transmit any worms or viruses or any code of a
                destructive nature.
              </p>
              <p>
                A breach or violation of any of the Terms will result in an
                immediate termination of your Services.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 border-b border-gray-200 pb-2">
              SECTION 2 - GENERAL CONDITIONS
            </h2>
            <div className="text-gray-800 leading-relaxed space-y-4">
              <p>
                We reserve the right to refuse Service to anyone for any reason
                at any time.
              </p>
              <p>
                You understand that your content (not including credit card
                information), may be transferred unencrypted and involve (a)
                transmissions over various networks; and (b) changes to conform
                and adapt to technical requirements of connecting networks or
                devices. Credit card information is always encrypted during
                transfer over networks.
              </p>
              <p>
                You agree not to reproduce, duplicate, copy, sell, resell or
                exploit any portion of the Service, use of the Service, or
                access to the Service or any contact on the website through
                which the Service is provided, without express written
                permission by us.
              </p>
              <p>
                The headings used in this agreement are included for convenience
                only and will not limit or otherwise affect these Terms.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 border-b border-gray-200 pb-2">
              SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
            </h2>
            <div className="text-gray-800 leading-relaxed space-y-4">
              <p>
                We are not responsible if information made available on this
                site is not accurate, complete or current. The material on this
                site is provided for general information only and should not be
                relied upon or used as the sole basis for making decisions
                without consulting primary, more accurate, more complete or more
                timely sources of information. Any reliance on the material on
                this site is at your own risk.
              </p>
              <p>
                This site may contain certain historical information. Historical
                information, necessarily, is not current and is provided for
                your reference only. We reserve the right to modify the contents
                of this site at any time, but we have no obligation to update
                any information on our site. You agree that it is your
                responsibility to monitor changes to our site.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 border-b border-gray-200 pb-2">
              SECTION 4 - CONTACT INFORMATION
            </h2>
            <div className="text-gray-800 leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="mb-4">
                Questions about the Terms of Service should be sent to us at:
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Essancia Fashion</strong>
                </p>
                <p>Email: contact@essanciafashion.com</p>
                <p>Address: Worli, Mumbai, India</p>
                <p>Phone: +91 8080261261</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 mb-8 text-center text-sm text-gray-500">
          Last updated: June 2023
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
