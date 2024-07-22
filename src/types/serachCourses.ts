export interface SearchCourses {
    level: string
    courses: {
      id: string
      title: string
      slug: string
      levelId: string
    }[]
  }
  