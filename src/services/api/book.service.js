import axios from '@/libs/axios'

const BookService = {
  bookCreate: async (book) => {
    const { data } = await axios.post('/library/book/create/', book)
    return data
  },
  bookUpdate: async (id, formData) => {
    return await axios.patch('/library/book/' + id + '/', formData, {
      headers: {
        'Content-Type': undefined
      }
    })
  },

  download: async (link, title) => {
    const { data } = await axios.get(`https://${link.slice(7)}`, {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([data]))
    const linkElement = document.createElement('a')
    linkElement.href = url
    linkElement.setAttribute('download', `${title}.docx`)
    document.body.appendChild(linkElement)
    linkElement.click()
    return new File([data], 'name')
  },

  fetchBookList: async (payload) => {
    const params = new URLSearchParams()
    for (const p in payload) {
      if (payload[p]) {
        if (p === 'languageFilter') {
          payload.languageFilter.forEach((language) => {
            params.append('language', language)
          })
        }
        params.append(p, payload[p])
      }
    }
    const { data } = await axios.get('/library/book/list/', { params })
    return data
  },

  fetchBook: async (id) => {
    const { data } = await axios.get(`library/book/${id}/`)
    return data
  },
  fetchCategories: async (payload) => {
    const { data } = await axios.get('/library/category/', {
      params: {
        search: payload.search,
        offset: (payload.currentPage - 1) * payload.itemsPerPage,
        limit: payload.itemsPerPage,
        udc: payload.udcFilter
      }
    })
    return data
  },
  fetchUdc: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/udc/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  },
  fetchJournal: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/journal/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  },
  fetchAuthors: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/author/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  },
  fetchPublishers: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/publisher/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  },
  fetchDocumentType: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/document_type/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  },
  fetchDiscipline: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/discipline/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  },
  fetchDepartment: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/department/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  },
  fetchCopyrightMark: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/copyright_mark/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  },
  fetchEditors: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/editor/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  },
  fetchLanguages: async (currentPage, itemsPerPage) => {
    const { data } = await axios.get('library/language/list/', {
      params: {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
    })
    return data
  }
}

export default BookService
