import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "Computer Vision",
      folderDefaultState: "open",
      sortFn: (a, b) => {
        const categoryRank = (name: string) => {
          if (name === "Computer Vision Index") return 0
          if (name === "ComputerVision101_Theory") return 1
          if (name === "ComputerVision101_Theory_Week1") return 2
          if (name.startsWith("ComputerVision101_Week1_")) return 3
          if (name === "CV101_Lectures" || name === "CV101_LectureNotes") return 4
          if (name === "CV101_Assignments" || name === "CV101_F1") return 5
          if (name === "CV101_RvdBoomgaard_LectureNotes") return 6
          return 10
        }

        const week1Order = (name: string) => {
          const order = [
            "ComputerVision101_Week1_WhatIsAnImage",
            "ComputerVision101_Week1_ImageDefinition_DomainAndRange",
            "ComputerVision101_Week1_Discretization",
            "ComputerVision101_Week1_Sampling",
            "ComputerVision101_Week1_Quantization",
            "ComputerVision101_Week1_Interpolation",
            "ComputerVision101_Week1_NearestNeighborInterpolation",
            "ComputerVision101_Week1_LinearInterpolation",
            "ComputerVision101_Week1_BilinearInterpolation",
            "ComputerVision101_Week1_Histograms",
            "ComputerVision101_Week1_NyquistShannonSamplingTheorem",
            "ComputerVision101_Week1_LocalOperators",
          ]
          const idx = order.indexOf(name)
          return idx === -1 ? 999 : idx
        }

        const rankDiff = categoryRank(a.displayName) - categoryRank(b.displayName)
        if (rankDiff !== 0) return rankDiff

        if (
          a.displayName.startsWith("ComputerVision101_Week1_") &&
          b.displayName.startsWith("ComputerVision101_Week1_")
        ) {
          return week1Order(a.displayName) - week1Order(b.displayName)
        }

        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
      filterFn: (node) => {
        if (node.slugSegment === "tags") return false
        const hidden = [
          "ICV_2026_HC0a_kickoff",
          "ICV_2026_HC1a_Images_Interpol",
          "ICV_2026_HC1a_Images_Interpol 1",
          "ComputerVision101_Week1_WhatIsAnImage_Slide-12",
          "ComputerVision101_Week1_Definition_Slide-13",
          "ComputerVision101_Week1_Sampling_Slide-22",
          "ComputerVision101_Week1_Quantization_Slide-19",
          "ComputerVision101_Week1_NearestNeighbor_Slide-27",
          "ComputerVision101_Week1_LinearInterpolation_Slide-29",
          "ComputerVision101_Week1_BilinearInterpolation_Slide-38",
        ]
        return !hidden.includes(node.slugSegment)
      },
      mapFn: (node) => {
        const pretty = (name: string) =>
          name
            .replace(/^ComputerVision101_/, "")
            .replace(/^CV101_/, "")
            .replace(/_/g, " ")
            .replace(/^Week1 /, "Week 1: ")
            .replace(/^Theory Week1$/, "Theory Week 1")
            .replace(/^F1$/, "Assignment F1")
            .replace(/^RvdBoomgaard Lecture Notes$/, "Rvd Boomgaard Lecture Notes")

        node.displayName = pretty(node.displayName)
        return node
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "Computer Vision",
      folderDefaultState: "open",
      filterFn: (node) => node.slugSegment !== "tags",
      mapFn: (node) => {
        node.displayName = node.displayName
          .replace(/^ComputerVision101_/, "")
          .replace(/^CV101_/, "")
          .replace(/_/g, " ")
        return node
      },
    }),
  ],
  right: [],
}
