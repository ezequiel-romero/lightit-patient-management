import { useState } from 'react'
import { userType } from '../types'
import clsx from 'clsx'
import moment from 'moment'
import { FaCalendarDays, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { Button } from './Button'

type CardProps = {
  key: string
  user: userType
  openModal: () => void
}

export const Card = ({ key, user, openModal }: CardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div key={key} className="card">
      <div className="cardHeader">
        <img
          className="cardAvatar"
          src={user.avatar}
          alt={user.name}
          onError={(e) => {
            e.currentTarget.src = '/user-placeholder.svg'
          }}
        />
        <div>
          <h3>{user.name}</h3>
          <a href={user.website} target="_blank">
            Visit website <FaArrowUpRightFromSquare />
          </a>
        </div>
      </div>
      <div className={clsx('cardContent', isExpanded && 'expanded')}>
        <p>{user.description}</p>
      </div>
      <div className="cardFooter">
        <span>
          <FaCalendarDays /> {moment(user.createdAt).format('MM/DD/YY')}
        </span>
        <div className="cardButtons">
          <Button text="Edit" size="small" variant="secondary" onClick={openModal} />
          <Button
            text={isExpanded ? 'Show less' : 'Show more'}
            onClick={() => setIsExpanded(!isExpanded)}
            size="small"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  )
}
