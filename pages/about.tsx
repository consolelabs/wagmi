/* eslint-disable react/no-unescaped-entities */
import { Layout } from '~components/layout'
import { SEO } from '~components/layout/seo'
import { PAGES } from '~constants'
import { CONTRIBUTORS } from '~libs/contributor'

export default function AboutPage() {
  return (
    <Layout>
      <SEO
        title={PAGES.ABOUT.title}
        description="Indie financial webcomic to get you through life-bonkers"
        twitterCardLarge={false}
      />
      <h1 className="pt-24 text-5xl text-center font-[YanoneKaffeesatz-Bold]">
        ABOUT
      </h1>
      <div className="px-6 mx-auto mt-6 max-w-xl">
        Welcome to WAGMI blog by Console team.
        <br />
        <br />
        We are a team of software engineers and makers thriving for success in
        life. While success varies for each of us, we all agree that money and
        financial planning play an important role in our life. And we think
        <br />
        <br />
        <ul className="pl-4 list-disc">
          <li>
            A better understanding will guides smart decisions for well-being
            and stability.
          </li>
          <li>Indie financial prep will navigate us through life-bonkers.</li>
          <li>Financial knowledge will ensure more “make it” opportunities.</li>
        </ul>
        <br />
        As we're exploring those topics, we'll try to share them in a proper
        narration, short illustrates, featuring the neko and mochi pals. <br />{' '}
        We hope WAGMI will be helpful to you. And let's kick off this journey.
        <br />
        <br />
        <p className="text-2xl font-[YanoneKaffeesatz-Bold]">Contact</p>
        <ul className="pl-4 list-disc">
          <li>
            If you'd like to say hi:{' '}
            <a className="underline" href="mailto:gm@console.so">
              gm@console.so
            </a>
            .
          </li>
          <li>
            For material and idea contributions:{' '}
            <a className="underline" href="mailto:wagmi@console.so">
              wagmi@console.so
            </a>
            .
          </li>
          <li>
            Join us on Telegram:{' '}
            <a className="underline" href="https://t.me/+mzE3DsHNLeNjNzRl">
              @wagmi
            </a>
            .
          </li>
        </ul>
        <br />
        <p className="text-2xl font-[YanoneKaffeesatz-Bold]">Token</p>
        We use the $WAGMI token to reward our contributors and provide holders
        with the ability to participate in the growth of WAGMI.
        <br />
        <br />
        <p className="text-2xl font-[YanoneKaffeesatz-Bold]">Contribution</p>
        We welcome more stories and perspectives. Any topic that you find
        relevant or if you love what we do, you can contribute by sending them
        to our email.
        <br />
        <br />
        <p className="text-2xl font-[YanoneKaffeesatz-Bold]">
          Special thanks to:
        </p>
        <ul className="pl-4 list-disc">
          <li>Console Labs team members</li>
          <li>
            <a className="underline" href="https://github.com/vdhieu">
              @hieuvd
            </a>{' '}
            for crafting this website
          </li>
        </ul>
        <br />
        Disclaimer: <br />
        <ul className="pl-4 list-disc">
          <li>The stories are not our financial advices.</li>
          <li>
            We can't promise you'll be the next Elon Musk or Warren Buffett.
          </li>
          <li>Make informed decisions – do your assessment.</li>
        </ul>
        <br />
      </div>
    </Layout>
  )
}
