import React from 'react'
import Intro from './profileBusiness/Intro'
import About from './profileBusiness/About'
import Jobs from './profileBusiness/Jobs'

const ProfileBusiness = ({userData}) => {
  return (
    <div className='w-full flex flex-col items-center gap-[10px] px-[60px] py-[40px]'>
      <Intro userData={userData} />
      {userData.about && <About userData={userData} />}
      {userData.jobs && <Jobs userData={userData} />}
    </div>
  )
}

export default ProfileBusiness