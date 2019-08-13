import { stringify } from 'query-string'
import config from '../../config'

export const fetchMinesweeper = (data) => fetch(`${config.TIKI_ENDPOINT}/getMines?${stringify(data)}`).then(resp => resp.json())
