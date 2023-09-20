import axios from 'axios'

const baseUrl = 'https://gateway.scan-interfax.ru'

function login(name, password) {
  return axios.post(`${baseUrl}/api/v1/account/login`, {
    login: name,
    password,
  })
 
}

function getLimits() {
  return axios
    .get(`${baseUrl}/api/v1/account/info`, {
      headers: {
        Authorization: localStorage.getItem('auth')
          ? `Bearer ${JSON.parse(localStorage.getItem('auth')).accessToken}`
          : '',
      },
    })
    .then((res) => res.data)
}

function sendHistograms( 
  issueDateInterval, 
  inn,
  tonality,
  limit,
  maxFullness,
  inBusinessNews,
  onlyMainRole,
  onlyWithRiskFactors,
  excludeTechNews,
  excludeAnnouncements,
  excludeDigests  
) {
  return axios
    .post(
      `${baseUrl}/api/v1/objectsearch/histograms`,
      {
       
        issueDateInterval,
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: 'company',
                sparkId: null,
                entityId: null,
                inn,
                maxFullness,
                inBusinessNews,
              },
            ],
            onlyMainRole,
            tonality,
            onlyWithRiskFactors,
            riskFactors: {
              and: [],
              or: [],
              not: [],
            },
            themes: {
              and: [],
              or: [],
              not: [],
            },
          },
          themesFilter: {
            and: [],
            or: [],
            not: [],
          },
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: [],
        },
        attributeFilters: {
          excludeTechNews,
          excludeAnnouncements,
          excludeDigests,
        },
        similarMode: 'duplicates',
        limit,
        sortType: 'issueDate',
        sortDirectionType: 'desc',
        intervalType: 'month',
        histogramTypes: ['totalDocuments', 'riskFactors'],
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('auth')).accessToken
          }`,
        },
      }
    )
    .then((res) => res.data)
}

function takeDocsId( 
  issueDateInterval,
  inn,
  tonality,
  limit,
  maxFullness,
  inBusinessNews,
  onlyMainRole,
  onlyWithRiskFactors,
  excludeTechNews,
  excludeAnnouncements,
  excludeDigests
) {
  return axios
    .post(
      `${baseUrl}/api/v1/objectsearch`,
      {
        issueDateInterval,
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: 'company',
                sparkId: null,
                entityId: null,
                inn,
                maxFullness,
                inBusinessNews,
              },
            ],
            onlyMainRole,
            tonality: 'any',
            onlyWithRiskFactors,
            riskFactors: {
              and: [],
              or: [],
              not: [],
            },
            themes: {
              and: [],
              or: [],
              not: [],
            },
          },
          themesFilter: {
            and: [],
            or: [],
            not: [],
          },
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: [],
        },
        attributeFilters: {
          excludeTechNews,
          excludeAnnouncements,
          excludeDigests,
        },
        similarMode: 'duplicates',
        limit,
        sortType: 'issueDate',
        sortDirectionType: 'desc',
        intervalType: 'month',
        histogramTypes: ['totalDocuments', 'riskFactors'],
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('auth')).accessToken
          }`,
        },
      }
    )
    .then((res) => res.data)
}

function takeDocs(ids) {
  return axios
    .post(
      `${baseUrl}/api/v1/documents`,
      { ids },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('auth')).accessToken
          }`,
        },
      }
    )
    .then((res) => res.data)
}

export { login, getLimits, sendHistograms, takeDocsId, takeDocs }
