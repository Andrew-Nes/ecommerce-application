import Develop3Photo from '../../assets/img/developer3_photo.jpg';
import Develop2Photo from '../../assets/img/developer2_photo.jpg';
import Develop1Photo from '../../assets/img/developer1_photo.jpg';

interface developerDesc {
  photoLink?: string;
  fullName: string;
  role: string;
  bio: string[];
  workMade: string;
  githubLink: string;
  githubName: string;
  id: string;
}

const developer1Data: developerDesc = {
  photoLink: Develop1Photo,
  fullName: 'Andrei Niasmachny',
  role: 'Team Lead, JS/Front-end developer',
  bio: [
    'I am 32 years old and I live in Minsk.',
    'For the last six years, I have been working as a political analyst.',
    'However, I’ve decided to change my job and lifestyle and try myself in the Information technologies sphere as a developer, cause in my opinion it will provide me with wide perspectives for self-education and ability to choose my occupation and lifestyle basing on my skills and wishes.',
  ],
  workMade:
    'Routing, Detailed product page, Add to basket / Remove from basket buttons',
  githubLink: 'https://github.com/andrew-nes',
  githubName: 'andrew-nes',
  id: 'd1',
};

const developer2Data: developerDesc = {
  photoLink: Develop2Photo,
  fullName: 'Mikita Razumau',
  role: 'JS/Front-end developer',
  bio: [
    "My name is Mikita and I'm 30 years old.",
    'Finished Vitebsk State Technological University with a degree in light industry engineering and also received a specialty as a software engineer, taking additional courses at my university.',
    "At the beginning of 2023 I have joined and successfully finished the preparation part of the 'Front-end/JavaScript developer' course from RS School. Currently I'm attending the main part of the course.",
  ],
  workMade: 'Registration page, Customer page, Basket page',
  githubLink: 'https://github.com/razumaumikita',
  githubName: 'razumaumikita',
  id: 'd2',
};

const developer3Data: developerDesc = {
  photoLink: Develop3Photo,
  fullName: 'Katsiaryna Karabeika',
  role: 'JS/Front-end developer',
  bio: [
    "My name is Kate, I'm citizen of Belarus, but currently live in Georgia.",
    "I'm certified international lawyer who decided to change her profession after 5 years of work in human rights protection sphere and become a developer.",
    'Raising three cats.',
  ],
  workMade: 'Login page, Catalog page, Pagination, About us page',
  githubLink: 'https://github.com/katerina-kor',
  githubName: 'katerina-kor',
  id: 'd3',
};

export { developer1Data, developer2Data, developer3Data };
