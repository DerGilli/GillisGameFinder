import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faGlobe, faStar } from "@fortawesome/free-solid-svg-icons";
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons'
import '../css/Iconbar.css'

export default (props) => {
  return (
    <div className="Iconbar">
      <FontAwesomeIcon id="trophy" className="icon" icon={faTrophy} />
      <a target="_blank" rel="noreferrer" href={props.redditLink}><FontAwesomeIcon className="icon" icon={faRedditAlien} /></a>
      <a target="_blank" rel="noreferrer" href={props.website}><FontAwesomeIcon className="icon" icon={faGlobe} /></a>
      <FontAwesomeIcon id="star" className="icon" icon={faStar} />
    </div>
  )
}
