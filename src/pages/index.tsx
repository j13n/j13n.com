import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Container } from "@/components/Container"
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/SocialIcons"

import logoAirbnb from "@/images/logos/airbnb.svg"
import logoFacebook from "@/images/logos/facebook.svg"
import logoPlanetaria from "@/images/logos/planetaria.svg"
import logoStarbucks from "@/images/logos/starbucks.svg"
import { formatDate } from "@/lib/formatDate"
import { getAllArticles } from "@/lib/getAllArticles"
import { routes } from "@/lib/routes"

type IconProps = {
  className?: string
}

function BriefcaseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.25 15.25V6.75H8.75"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17 7L6.75 17.25"
      ></path>
    </svg>
  )
}

function Article({ article }: any) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

type SocialLinkProps = {
  icon: React.ComponentType<IconProps>
  href: string
  "aria-label": string
}

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Resume() {
  let resume = [
    {
      company: "Planetaria",
      title: "CEO",
      logo: logoPlanetaria,
      start: "2019",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: "Airbnb",
      title: "Product Designer",
      logo: logoAirbnb,
      start: "2014",
      end: "2019",
    },
    {
      company: "Facebook",
      title: "iOS Software Engineer",
      logo: logoFacebook,
      start: "2011",
      end: "2014",
    },
    {
      company: "Starbucks",
      title: "Shift Supervisor",
      logo: logoStarbucks,
      start: "2008",
      end: "2011",
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start} until ${
                  typeof role.end === "string" ? role.end : role.end.label
                }`}
              >
                <time dateTime={role.start}>{role.start}</time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time
                  dateTime={
                    typeof role.end === "string"
                      ? role.end
                      : String(role.end.dateTime)
                  }
                >
                  {typeof role.end === "string" ? role.end : role.end.label}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href={routes.about.path}
        variant="secondary"
        className="group mt-6 w-full"
      >
        View about
        <ArrowUpRightIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

export default function Home({ articles }: any) {
  return (
    <>
      <Head>
        <title>
          Spencer Sharp - Software designer, founder, and amateur astronaut
        </title>
        <meta
          name="description"
          content="I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software and Business Intelligence Developer
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos;m Jan, a software and business intelligence developer based
            in the Netherlands.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com/j13ncom"
              aria-label="Follow me on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://github.com/j13n"
              aria-label="Follow me on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/jan-oppermann/"
              aria-label="Connect with me on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article: any) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
