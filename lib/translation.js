const currentLanguage = 'ind'

const en = {
  tk_home: 'Home',
  tk_news: 'News',
  tk_education: 'Education',
  tk_articles: 'Articles',
  tk_events: 'Events',
  tk_jobs: 'Jobs',
  tk_tools: 'Tools',
  tk_duniakripto: 'Duniakripto',
  tk_copyright: 'Copyright',
  tk_toggle_dark_mode: 'Toggle dark mode',
  tk_bookmarks: 'Bookmarks',
  tk_search_placeholder: 'Search by #tags or in title',
  tk_no_result: 'No result',
  tk_error: 'Error',
  tk_follow_us: 'Follow us in',
  tk_and: 'and',
  tk_click_read_more: 'Click to read more',
  tk_support_us: 'Support us',
  tk_preview: 'Preview',
  tk_support_text: 'The project right now doesn\'t have any monetization. Help us to continue to build and grow a great educational and information crypto portal.',
  tk_source: 'Source:',
}

const ind = {
  tk_home: 'Beranda',
  tk_news: 'Berita',
  tk_education: 'Pendidikan',
  tk_articles: 'Artikel',
  tk_events: 'Acara',
  tk_jobs: 'Pekerjaan',
  tk_tools: 'Alat',
  tk_duniakripto: 'Duniakripto',
  tk_copyright: 'Hak cipta',
  tk_toggle_dark_mode: 'Alihkan mode gelap',
  tk_bookmarks: 'Penanda Buku',
  tk_search_placeholder: 'Cari berdasarkan #tag atau dalam judul',
  tk_no_result: 'Tidak ada hasil',
  tk_error: 'Kesalahan',
  tk_follow_us: 'Ikuti kami di',
  tk_and: 'dan',
  tk_support_us: 'Dukung kami',
  tk_source: 'Sumber:',
  tk_click_read_more: 'Klik untuk membaca lebih lanjut',
  tk_preview: 'Pratinjau',
  tk_support_text: 'Project saat ini tidak memiliki monetisasi apa pun. Bantu kami untuk terus membangun dan mengembangkan portal kripto pendidikan dan informasi yang hebat.',
}

const dictionary = { ind, en }

const translate = (key, lng = currentLanguage) =>
  dictionary[lng][key.toLowerCase()] || key

export { translate, currentLanguage }
