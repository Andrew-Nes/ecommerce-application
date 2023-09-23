import { FC } from 'react';

interface TeamMemberDescriptionProps {
  fullName: string;
  role: string;
  bio: string[];
  workMade: string;
  githubLink: string;
  githubName: string;
  id: string;
}

const TeamMemberDescription: FC<TeamMemberDescriptionProps> = (
  props: TeamMemberDescriptionProps
) => {
  return (
    <div className="description__team-member">
      <div className="team-member__photo" id={props.id}></div>
      <div className="team-member__info">
        <h4 className="team-member__name text">{props.fullName}</h4>
        <p className="team-member__role text italic">{props.role}</p>
        {props.bio.map((paragraph, index) => (
          <p className="team-member__bio text" key={index}>
            {paragraph}
          </p>
        ))}
        <p className="team-member__work-made text">
          <span className="bold">Worked on: </span>
          {props.workMade}.
        </p>
        <p className="team-member__link_github text">
          <span className="bold">Contact on GitHub:</span>
          <a href={props.githubLink}> {props.githubName}</a>
        </p>
      </div>
    </div>
  );
};

export default TeamMemberDescription;
