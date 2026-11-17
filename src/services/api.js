'use client'

import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'

import ambassadorsData from '../data/ambassadors.json'
import batchesData from '../data/batches.json'
import communityPartnersData from '../data/community-partners.json'
import competitionsListableData from '../data/competitions_listable.json'
import competitionsRegistrableData from '../data/competitions_registrable.json'
import configData from '../data/config.json'
import departmentsData from '../data/departments.json'
import disciplinesData from '../data/disciplines.json'
import exeTeamData from '../data/exeTeam.json'
import exhibitionsData from '../data/exhibitions.json'
import hofData from '../data/hof.json'
import mediaPartnersData from '../data/media-partners.json'
import sponsorsData from '../data/sponsors.json'
import techCollaboratorsData from '../data/tech-collaborators.json'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://dev-backend.softecnu.org/api',
  timeout: 8000,
})

const fallbackMap = {
  '/ambassadors/': ambassadorsData,
  'batches/': batchesData,
  '/community-partners/': communityPartnersData,
  '/competitions_listable/': competitionsListableData,
  '/competitions_registrable/': competitionsRegistrableData,
  'config/': configData,
  'departments/': departmentsData,
  'disciplines/': disciplinesData,
  '/exeTeam/': exeTeamData,
  '/exhibitions/': exhibitionsData,
  '/hof/': hofData,
  '/media-partners/': mediaPartnersData,
  '/sponsors/': sponsorsData,
  '/tech-collaborators/': techCollaboratorsData,
}

export function useApiQuery(endpoint) {
  const fallback = fallbackMap[endpoint]
  const [data, setData] = useState(fallback ?? null)
  const [isLoading, setIsLoading] = useState(fallback === undefined)
  const [error, setError] = useState(null)
  const [isFetched, setIsFetched] = useState(fallback !== undefined)

  useEffect(() => {
    let active = true
    api
      .get(endpoint)
      .then((res) => {
        if (!active) return
        setData(res.data)
        setError(null)
      })
      .catch((err) => {
        if (!active) return
        if (fallback === undefined) {
          setError(err)
        }
      })
      .finally(() => {
        if (!active) return
        setIsLoading(false)
        setIsFetched(true)
      })
    return () => {
      active = false
    }
  }, [endpoint, fallback])

  return { data, isLoading, error, isError: Boolean(error), isFetched }
}

export function useRegistrationConfig(type) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [config, setConfig] = useState({})

  const applyConfig = useCallback(
    (d) => {
      if (type === 'ambassador') setIsOpen(Boolean(d.isAmbassadorRegOpen))
      else if (type === 'officer') setIsOpen(Boolean(d.isOfficerRegOpen))
      else if (type === 'team') setIsOpen(Boolean(d.isTeamRegOpen))
      setConfig({
        foodFee: d.foodFee,
        accommodationFee: d.accommodationFee,
        isFoodRegOpen: d.isFoodRegOpen,
        isAccommodationRegOpen: d.isAccommodationRegOpen,
      })
    },
    [type]
  )

  useEffect(() => {
    let active = true
    api
      .get('config/')
      .then((res) => {
        if (active) applyConfig(res.data)
      })
      .catch(() => {
        if (active) applyConfig(configData)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [applyConfig])

  return { isOpen, config, isLoading }
}
