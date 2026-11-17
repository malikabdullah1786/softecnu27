'use client'

import { useState } from 'react'
import FsLightboxPkg from 'fslightbox-react'

const FsLightbox = FsLightboxPkg?.default ?? FsLightboxPkg
import assets from '../assets'

export default function MemberCard({ member, role, imageClass = '' }) {
  const [toggler, setToggler] = useState(false)

  return (
    <>
      <div className="overflow-hidden w-full max-w-[300px] flex flex-col rounded-xl bg-white shadow-sm border border-secondary/15">
        <div
          className="grid grid-areas-image min-h-[360px] overflow-hidden group bg-light cursor-pointer"
          onClick={() => setToggler(!toggler)}
        >
          <img
            className={`w-full h-[360px] object-cover group-hover:scale-[115%] transition-all ${imageClass}`}
            src={member.image}
            alt={member.name}
            loading="lazy"
          />
          <div className="w-full h-full grid place-items-center z-[20] opacity-0 transition-opacity group-hover:bg-hover group-hover:!opacity-100">
            {member.link ? (
              <a
                href={member.link}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <img height={50} width={50} src={assets.LinkedIn} alt="linkedin icon" />
              </a>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="50"
                height="50"
                className="cursor-pointer"
              >
                <path
                  d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zM10 10V7h2v3h3v2h-3v3h-2v-3H7v-2h3z"
                  fill="#CEEF55"
                />
              </svg>
            )}
          </div>
        </div>

        <section className="py-4 px-2 flex-1 text-center border-t border-secondary/10">
          <h4 className="text-[1.4rem] mx-1 text-secondary font-bold">{member.name}</h4>
          {role !== 'ambassador' && (
            <p className="text-sm text-dark/70 font-medium mt-1">{member.position}</p>
          )}
          {member.institute && (
            <p className="mx-1 text-sm text-dark/60 mt-1">{member.institute}</p>
          )}
          {member.code && (
            <p className="text-xs font-semibold text-secondary bg-primary/40 inline-block px-3 py-1 rounded-full mt-2">
              Code: {member.code}
            </p>
          )}
        </section>
      </div>

      <FsLightbox toggler={toggler} type="image" sources={[member.image]} />
    </>
  )
}
