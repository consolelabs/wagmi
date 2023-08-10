/* eslint-disable react/no-unescaped-entities */
import { Layout } from '~components/layout'
import { SEO } from '~components/layout/seo'
import { PAGES } from '~constants'

export default function AboutPage() {
  return (
    <Layout>
      <SEO title={PAGES.ABOUT.title} tailTitle />
      <h1 className="font-[YanoneKaffeesatz-Bold] text-center pt-24 text-5xl">
        ABOUT
      </h1>
      <div className="max-w-xl mx-auto mt-6">
        Welcome to our financial literacy blog!
        <br />
        <br />
        We're a motley crew of engineers and makers determined to conquer life.
        No matter the definition of success, we can’t deny that money plays a
        big part in achieving our wildest dreams.
        <br />
        <br />
        Money makes the world go-'round, and we're here to help you navigate the
        crazy ride!
        <br />
        <br />
        <ul className="list-disc pl-4">
          <li>
            A better understanding of money will help us make wise financial
            decisions contributing to our well-being and stability.
          </li>
          <li>
            That's not all! Financial knowledge will ensure you never miss any
            “make it” chances with both hands.
          </li>
          <li>
            Only financial knowledge can arm you with the resilience to bounce
            back from expected and utterly life-bonkers.
          </li>
        </ul>
        <br />
        So, this blog is your secret weapon, filled with tips, tricks, and
        hilarious stories to help you manage money.
        <br />
        <br />
        Disclaimer: We can't promise you'll be the next Elon Musk or Warren
        Buffett, but we'll make sure you can be the master of managing your
        wallet. Let's get this money party started!
      </div>
    </Layout>
  )
}
