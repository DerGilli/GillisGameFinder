import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy, faGlobe, faStar} from '@fortawesome/free-solid-svg-icons';
import {faRedditAlien} from '@fortawesome/free-brands-svg-icons';
import '../css/Iconbar.css';

const Iconbar = ({redditLink, website}) => {
	return (
		<div className='Iconbar'>
			<FontAwesomeIcon id='trophy' className='icon' icon={faTrophy} />
			{redditLink && (
				<a target='_blank' rel='noreferrer' href={redditLink}>
					<FontAwesomeIcon className='icon' icon={faRedditAlien} />
				</a>
			)}
			{website && (
				<a target='_blank' rel='noreferrer' href={website}>
					<FontAwesomeIcon className='icon' icon={faGlobe} />
				</a>
			)}
			<FontAwesomeIcon id='star' className='icon' icon={faStar} />
		</div>
	);
};
export default Iconbar;
