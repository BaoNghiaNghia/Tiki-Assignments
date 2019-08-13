export const checkResponseStatus = (resp) => Boolean(resp && resp.data && resp.msg === 'success')

export const level_config = {
    beginner: {
      boardWidth: 9,
      boardHeight: 9,
      bombNum: 10,
      cellSize: 40
    },
    advantaged: {
      boardWidth: 16,
      boardHeight: 16,
      bombNum: 40,
      cellSize: 40
    },
  }