import './aboutPage.scss';
import { FC } from 'react';
import { headingText } from '../../../types/elementsText';
import TeamMemberDescription from '../../TeamMemberDescription/TeamMemberDescription';
import {
  developer1Data,
  developer2Data,
  developer3Data,
} from '../../../data/developersData';
import RSLogo from '../../../../assets/img/rs_school.svg';

const AboutPage: FC = () => {
  return (
    <main className="main about-page">
      <div className="wrapper about-page__wrapper">
        <h3 className="heading about__heading">
          {headingText.ABOUT_PAGE_HEADING}
        </h3>
        <div className="description description__team">
          <p className="text">
            Our development team{' '}
            <span className="bold">"YellowDuckProgrammers"</span> went through a
            long and hard learning curve before coming together to create the{' '}
            <span className="bold">best pets shop</span>.
          </p>
          <p className="text">
            They worked days and sometimes nights, on weekdays and weekends.
            True, discussing the details and code review took more time than
            coding.
          </p>
          <p className="text">
            In the end, they learned to work together and created this store!
          </p>
        </div>
        <div className="description description__team-members">
          <TeamMemberDescription
            fullName={developer1Data.fullName}
            role={developer1Data.role}
            bio={developer1Data.bio}
            workMade={developer1Data.workMade}
            githubLink={developer1Data.githubLink}
            githubName={developer1Data.githubName}
            id={developer1Data.id}
          />
          <TeamMemberDescription
            fullName={developer2Data.fullName}
            role={developer2Data.role}
            bio={developer2Data.bio}
            workMade={developer2Data.workMade}
            githubLink={developer2Data.githubLink}
            githubName={developer2Data.githubName}
            id={developer2Data.id}
          />
          <TeamMemberDescription
            fullName={developer3Data.fullName}
            role={developer3Data.role}
            bio={developer3Data.bio}
            workMade={developer3Data.workMade}
            githubLink={developer3Data.githubLink}
            githubName={developer3Data.githubName}
            id={developer3Data.id}
          />
        </div>
        <div className="about__footer">
          <a className="about__footer__link" href="https://rs.school/">
            <img className="logo_rs" src={RSLogo} alt="rs-school logo" />
          </a>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
