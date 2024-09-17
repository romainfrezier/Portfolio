import {SchoolProject} from "@models/school-project.model";
import {PersonalProject} from "@models/personal-project.model";
import {WorkExperience} from "@models/work-experience.model";
import {Achievement} from "@models/achievement.model";
import {Skills} from "@models/skills.model";
import {Link} from "@models/link.model";
import {Position} from "@models/position.model";

export const fakeSchoolProjects: SchoolProject[] = [
  {
    "name": 'School project 1',
    "description": 'Description of school project 1',
    "number": 3,
    "date": '2021',
    "githubLink": 'https://github.com',
    "languages": 'lang',
    "demoLink": 'https://demo.com',
    "documentUrl": 'https://document.com'
  }
];

export const fakePersonalProjects: PersonalProject[] = [
  {
    "name": 'Personal project 1',
    "description": 'Description of personal project 1',
    "githubLink": 'https://github.com',
    "languages": 'lang',
    "url": 'https://demo.com',
  }
];

const fakePositions: Position[] = [
  {
    "description": 'Description of position 1',
    "date": '2021',
    "position": 'Position of work experience 1'
  },
  {
    "description": 'Description of position 2',
    "date": '2021',
    "position": 'Position of work experience 2'
  }
];


export const fakeWorkExperiences: WorkExperience[] = [
  {
    "skills": 'lang',
    "place": 'Place of work experience 1',
    "positions": fakePositions,
    "company": 'Company of work experience 1',
    "companyUrl": 'https://company.com',
    "companyLogo": 'https://logo.com'
  }
];

export const fakeAchievements: Achievement[] = [
  {
    "name": 'Achievement 1',
    "description": 'Description of achievement 1',
    "badge": 'https://badge.com',
    "link": 'https://achievement.com',
    "linkName": 'lang'
  }
];

export const fakeArchivedProjects: SchoolProject[] = [
  {
    "name": 'Archived project 1',
    "description": 'Description of archived project 1',
    "number": 3,
    "date": '2021',
    "githubLink": 'https://github.com',
    "languages": 'lang',
    "demoLink": 'https://demo.com',
    "documentUrl": 'https://document.com'
  }
];

export const fakeSkills: Skills = {
  programming_languages: [
    {id: 1, name: 'Programming language 1', src: 'https://src.com', link: 'https://link.com'},
  ],
  web: [
    {id: 1, name: 'Web 1', src: 'https://src.com', link: 'https://link.com'},
  ],
  db: [
    {id: 1, name: 'DB 1', src: 'https://src.com', link: 'https://link.com'},
  ],
  softwares: [
    {id: 1, name: 'Software 1', src: 'https://src.com', link: 'https://link.com'},
  ],
  services: [
    {id: 1, name: 'Service 1', src: 'https://src.com', link: 'https://link.com'},
  ],
  soft: [
    {id: 1, name: 'Soft 1', src: 'https://src.com', link: 'https://link.com'},
  ]
};

export const fakeLinks: Link[] = [
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/",
    icon: "assets/images/linkedin-social.webp"
  },
  {
    name: "github",
    url: "https://github.com/",
    icon: "assets/images/github-social.webp"
  },
  {
    name: "messenger",
    url: "https://m.me/",
    icon: "assets/images/messenger-social.webp"
  }
]
