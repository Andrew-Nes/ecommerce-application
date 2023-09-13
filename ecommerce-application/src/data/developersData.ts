import Develop3Photo from '../../assets/img/developer3_photo.jpg';

interface developerDesc {
  photoLink: string;
  fullName: string;
  role: string;
  bio: string[];
  workMade: string;
  githubLink: string;
  githubName: string;
  id: string;
}

const developer1Data: developerDesc = {
  photoLink: '',
  fullName: 'Andrei Niasmachny',
  role: 'Team Lead, JS/Front-end developer',
  bio: ['some bio'],
  workMade: 'routing, detailed product page',
  githubLink: 'https://github.com/andrew-nes',
  githubName: 'andrew-nes',
  id: 'd1',
};

const developer2Data: developerDesc = {
  photoLink: '',
  fullName: 'Mikita Razumau',
  role: 'JS/Front-end developer',
  bio: ['some bio'],
  workMade: 'registration page, customer page, basket page',
  githubLink: 'https://github.com/razumaumikita',
  githubName: 'razumaumikita',
  id: 'd2',
};

const developer3Data: developerDesc = {
  photoLink: Develop3Photo,
  fullName: 'Katsiaryna Karabeika',
  role: 'JS/Front-end developer',
  bio: [
    'Citizen of Belarus, currently live in Georgia.',
    'Certified international lawyer who decided to change her profession after 5 years of work and become a developer.',
    'Raising three cats.',
  ],
  workMade: 'login page, catalog page, about page',
  githubLink: 'https://github.com/katerina-kor',
  githubName: 'katerina-kor',
  id: 'd3',
};

export { developer1Data, developer2Data, developer3Data };
