$(document).ready(() => {
  let currentPlayer = 'white'
  let clickState = false;
  let clickedId = '';
  const images = {
    blackpawn: 'pieces/blackpawn.png',
    whitepawn: 'pieces/whitepawn.png',
    blackqueen: 'pieces/blackqueen.png',
    whitequeen: 'pieces/whitequeen.png',
    blackking: 'pieces/blackking.png',
    whiteking: 'pieces/whiteking.png',
    blackbishop: 'pieces/blackbishop.png',
    whitebishop: 'pieces/whitebishop.png',
    blackknight: 'pieces/blackknight.png',
    whiteknight: 'pieces/whiteknight.png',
    blackrook: 'pieces/blackrook.png',
    whiterook: 'pieces/whiterook.png'
  }
  const boardObject = { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'E',
    '6': 'F', '7': 'G', '8': 'H' }
  const reverseLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  const pieces = [
    'pawn', 'rook', 'queen', 'king', 'bishop', 'knight'
  ]
  const startingPieces = {
    'A1': 'rook',
    'B1': 'bishop',
    'C1': 'knight',
    'D1': 'queen',
    'E1': 'king',
    'F1': 'bishop',
    'G1': 'knight',
    'H1': 'rook',
    'A8': 'rook',
    'B8': 'bishop',
    'C8': 'knight',
    'D8': 'queen',
    'E8': 'king',
    'F8': 'bishop',
    'G8': 'knight',
    'H8': 'rook',
  }
  const boardSetup = () => {
    let cellHeightTotal = 8;

    let color = 'whitespace'
    for (let i = 1; i <= cellHeightTotal; i++) {
      let horizontal = 1;
      while (horizontal <= 8) {
        const letter = boardObject[horizontal.toString()];
        let classString = `cell empty ${color}`;
        if (startingPieces[letter + i.toString()]) {
          classString = classString.replace('empty', startingPieces[letter + i.toString()])
          if (i === 1) classString += ' ownerblack'
          if (i === 8) classString += ' ownerwhite'
        }
        if (i === 2) {
          classString = classString.replace('empty', 'pawn ownerblack')
        }
        if (i === 7) {
          classString = classString.replace('empty', 'pawn ownerwhite')
        }
        $('#board').append(`<div class="${classString}" id=${letter + i.toString()}>${letter + i.toString()}</div>`)
        horizontal++;
        color = horizontal <= 8
          ? color === 'whitespace'
            ? 'blackspace' : 'whitespace'
          : color;
      }
    }
    const pawns = $('.pawn')
    pawns.each((i, obj) => {
      const image = obj.className.indexOf('ownerblack') > -1 ? images.blackpawn : images.whitepawn
      obj.textContent = ''
      $(`<img src=${image} />`).appendTo(obj)
    })
    const rooks = ['A1', 'H1', 'A8', 'H8']
    const bishops = ['B1', 'G1', 'B8', 'G8']
    const knights = ['C1', 'F1', 'C8', 'F8']
    const kings = ['E1', 'E8']
    const queens = ['D1', 'D8']
    rooks.forEach((id) => {
      const rook = $(`#${id}`)[0];
      const image = rook.className.indexOf('ownerblack') > -1 ? images.blackrook : images.whiterook
      rook.textContent = ''
      $(`<img src=${image} />`).appendTo(rook)
    })
    bishops.forEach((id) => {
      $(`#${id}`).text = ''
      const bishop = $(`#${id}`)[0];
      const image = bishop.className.indexOf('ownerblack') > -1 ? images.blackbishop : images.whitebishop
      bishop.textContent = ''
      $(`<img src=${image} />`).appendTo(bishop)
    })
    knights.forEach((id) => {
      const knight = $(`#${id}`)[0];
      const image = knight.className.indexOf('ownerblack') > -1 ? images.blackknight : images.whiteknight
      knight.textContent = ''
      $(`<img src=${image} />`).appendTo(knight)
    })
    kings.forEach((id) => {
      const king = $(`#${id}`)[0];
      const image = king.className.indexOf('ownerblack') > -1 ? images.blackking : images.whiteking
      king.textContent = ''
      $(`<img src=${image} />`).appendTo(king)
    })
    queens.forEach((id) => {
      const queen = $(`#${id}`)[0];
      const image = queen.className.indexOf('ownerblack') > -1 ? images.blackqueen : images.whitequeen
      queen.textContent = ''
      $(`<img src=${image} />`).appendTo(queen)
    })
    $('.cell').on('click', (e) => {
      if (!clickState) {
        if (e.target.closest('div').className.indexOf(`owner${currentPlayer}`)  === -1) {
          return
        }
        clickedId = e.target.closest('div').id
        $(`#${clickedId}`).addClass('clicked');
        clickState = true;
      }
      else if (clickState && clickedId === e.target.closest('div').id) {
        $(`#${clickedId}`).removeClass('clicked')
        clickState = false;
      }
      else {
        let piece;
        pieces.forEach((p) => {
          if ($(`#${clickedId}`)[0].className.includes(p)) piece = p
        })
        $(`#${clickedId}`)[0].className.includes('pawn');
        isValidMove(piece, currentPlayer, clickedId, e.target.closest('div'));
      }
    })
  }
  const pawnValid = (currPlayer, clickedId, targetSpace) => {
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    if (Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1])) !== 1) {
      alert('invalid move')
      return;
    }
    if (Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1])) === 1
      && Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0])) > 1) {
      alert('invalid move')
      return
    }
    if ($(`#${targetedSpace.id}`)[0].className.indexOf('empty') > -1 && Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0])) === 1) {
      alert('invalid move')
      return
    } if ($(`#${targetedSpace.id}`)[0].className.indexOf('empty') === -1 && Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0])) === 0) {
      alert('invalid move')
      return
    } else {
      const image = currPlayer === 'black' ? images.blackpawn : images.whitepawn;
      $(`#${clickedId}`).text(clickedId).removeClass(`owner${currPlayer} pawn clicked`).addClass('empty')
      $(`#${clickedId}`).empty()

      $(`#${targetSpace.id}`)
        .removeClass(`owner${currPlayer === 'white' ? 'black' : 'white'} empty pawn knight queen king rook bishop`)
        .addClass(`owner${currPlayer} pawn`).text('')
      $(`<img src=${image} />`).appendTo($(`#${targetSpace.id}`))
      clickState = false;
      clickedId = ''
      currentPlayer = currPlayer === 'white' ? 'black' :'white'
    }
  }
  const kingValid = (currPlayer, clickedId, targetSpace) => {
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    if (Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1])) !== 1) {
      alert('invalid move')
      return;
    }
    if (Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1])) === 1
      && Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0])) > 1) {
      alert('invalid move')
      return
    }
    else {
      const image = currPlayer === 'black' ? images.blackking : images.whiteking;
      $(`#${clickedId}`).text(clickedId).removeClass(`owner${currPlayer} king clicked`).addClass('empty')
      $(`#${clickedId}`).empty()
      $(`#${targetSpace.id}`)
        .removeClass(`owner${currPlayer === 'white' ? 'black' : 'white'} empty pawn knight queen king rook bishop`)
        .addClass(`owner${currPlayer} king`).text('')
      $(`<img src=${image} />`).appendTo($(`#${targetSpace.id}`))
      clickState = false;
      clickedId = ''
      currentPlayer = currPlayer === 'white' ? 'black' :'white'
    }
  }
  const rookValid = (currPlayer, clickedId, targetSpace) => {
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    if (currentSpace[0] !== targetId[0] && currentSpace[1] !== targetId[1]) {
      alert('invalid move')
      return;
    }
    else {
      const image = currPlayer === 'black' ? images.blackrook : images.whiterook;
      $(`#${clickedId}`).text(clickedId).removeClass(`owner${currPlayer} rook clicked`).addClass('empty')
      $(`#${clickedId}`).empty()
      $(`#${targetSpace.id}`)
        .removeClass(`owner${currPlayer === 'white' ? 'black' : 'white'} empty pawn knight queen king rook bishop`)
        .addClass(`owner${currPlayer} rook`).text('')
      $(`<img src=${image} />`).appendTo($(`#${targetSpace.id}`))
      clickState = false;
      clickedId = ''
      currentPlayer = currPlayer === 'white' ? 'black' :'white'
    }
  }

  const isValidMove = (piece, currPlayer, clickedId, targetSpace) => {
    const functionByPiece = {
      pawn: () => (pawnValid(currPlayer, clickedId, targetSpace)),
      rook: () => (rookValid(currPlayer, clickedId, targetSpace)),
      // bishop: bishopValid(currPlayer, clickedId, targetSpace),
      // knight: knightValid(currPlayer, clickedId, targetSpace),
      // queen: queenValid(currPlayer, clickedId, targetSpace),
      king: () => (kingValid(currPlayer, clickedId, targetSpace)),
    }
    functionByPiece[piece]()
  };
  boardSetup();
});
