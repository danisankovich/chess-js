$(document).ready(() => {
  let currentPlayer = 'white'
  let clickState = false;
  let clickedId = '';
  let inCheckBlack = false;
  let inCheckWhite = false
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
    'B1': 'knight',
    'C1': 'bishop',
    'D1': 'queen',
    'E1': 'king',
    'F1': 'bishop',
    'G1': 'knight',
    'H1': 'rook',
    'A8': 'rook',
    'B8': 'knight',
    'C8': 'bishop',
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
    const bishops = ['C1', 'F1', 'C8', 'F8']
    const knights = ['B1', 'G1', 'B8', 'G8']
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
        isValidMove(piece, clickedId, e.target.closest('div'));
      }
    })
  }
  const pawnValid = (clickedId, targetSpace, checkCheck = false) => {
    const piece = 'pawn'
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    if (Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1])) !== 1) {
      if (!checkCheck) alert('invalid move')
      return;
    }
    if (Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1])) === 1
      && Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0])) > 1) {
        if (!checkCheck) alert('invalid move')
      return;
    }
    if (
      currentPlayer === 'white' && (parseInt(currentSpace[1]) < parseInt(targetId[1]))
      ||currentPlayer === 'black' && (parseInt(currentSpace[1]) > parseInt(targetId[1]))
    ) {
      if (!checkCheck) alert('invalid move')
      return;
    }
    if ($(`#${targetedSpace.id}`)[0].className.indexOf('empty') > -1 && Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0])) === 1) {
      if (!checkCheck) alert('invalid move')
      return;
    } if ($(`#${targetedSpace.id}`)[0].className.indexOf('empty') === -1 && Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0])) === 0) {
      if (!checkCheck) alert('invalid move')
      return;
    } else {
      const image = currentPlayer === 'black' ? images.blackpawn : images.whitepawn;
      if (!checkCheck) {
        $(`#${clickedId}`).text(clickedId).removeClass(`owner${currentPlayer} pawn clicked`).addClass('empty')
        $(`#${clickedId}`).empty()
        $(`#${targetSpace.id}`)
          .removeClass(`owner${currentPlayer === 'white' ? 'black' : 'white'} empty pawn knight queen king rook bishop`)
          .addClass(`owner${currentPlayer} pawn`).text('')
        $(`<img src=${image} />`).appendTo($(`#${targetSpace.id}`))
        checkChecker('pawn', targetId);
        clickState = false;
        clickedId = ''
        currentPlayer = swapCurrentPlayer();
      } else {
        if (currentPlayer === 'white') inCheckBlack = true;
        if (currentPlayer === 'black') inCheckWhite = true;
        return { inCheckBlack, inCheckWhite }
      }
    }
  }
  const kingValid = (clickedId, targetSpace, checkCheck = false) => {
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    if (Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1])) !== 1) {
      if (!checkCheck) alert('invalid move')
      return;
    }
    if (Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1])) === 1
      && Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0])) > 1) {
        if (!checkCheck) alert('invalid move')
      return;
    }
    else {
      const image = currentPlayer === 'black' ? images.blackking : images.whiteking;
      if (!checkCheck) {
        $(`#${clickedId}`).text(clickedId).removeClass(`owner${currentPlayer} king clicked`).addClass('empty')
        $(`#${clickedId}`).empty()
        $(`#${targetSpace.id}`)
          .removeClass(`owner${currentPlayer === 'white' ? 'black' : 'white'} empty pawn knight queen king rook bishop`)
          .addClass(`owner${currentPlayer} king`).text('')
        $(`<img src=${image} />`).appendTo($(`#${targetSpace.id}`))
        checkChecker('king', targetId);

        clickState = false;
        clickedId = ''
        currentPlayer = swapCurrentPlayer();
      } else {
        if (currentPlayer === 'white') inCheckBlack = true;
        if (currentPlayer === 'black') inCheckWhite = true;
        return { inCheckBlack, inCheckWhite }
      }
    }
  }
  const rookValid = (clickedId, targetSpace, checkCheck = false, piece) => {
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    if (currentSpace[0] !== targetId[0] && currentSpace[1] !== targetId[1]) {
      if (!checkCheck) alert('invalid move')
      return;
    }
    const pass = noBlockersRook(currentSpace, targetId, checkCheck)
    if (pass) {
      let image;
      if (piece === 'rook') {
        image = currentPlayer === 'black' ? images.blackrook : images.whiterook;
      } if (piece === 'queen') {
        image = currentPlayer === 'black' ? images.blackqueen : images.whitequeen;
      }
      if (!checkCheck) {
        $(`#${clickedId}`).text(clickedId).removeClass(`owner${currentPlayer} ${piece} clicked`).addClass('empty')
        $(`#${clickedId}`).empty()
        $(`#${targetSpace.id}`)
          .removeClass(`owner${currentPlayer === 'white' ? 'black' : 'white'} empty pawn knight queen king rook bishop`)
          .addClass(`owner${currentPlayer} ${piece}`).text('')
        $(`<img src=${image} />`).appendTo($(`#${targetSpace.id}`))
        checkChecker('rook', targetId);

        clickState = false;
        clickedId = ''
        currentPlayer = swapCurrentPlayer();
      } else {
        if (currentPlayer === 'white') inCheckBlack = true;
        if (currentPlayer === 'black') inCheckWhite = true;
        return { inCheckBlack, inCheckWhite }

      }
    } else {
      if (!checkCheck) alert('invalid move')
      return
    }
  }
  const noBlockersRook = (currentSpace, targetId, checkCheck) => {
    const startLetter = currentSpace[0];
    const startLetterIndex = reverseLetter.indexOf(startLetter);
    const endLetter = targetId[0];
    const endLetterIndex = reverseLetter.indexOf(endLetter);
    const startNumber = parseInt(currentSpace[1])
    const endNumber = parseInt(targetId[1]);
    const leftRight = startLetterIndex > endLetterIndex ? 'left' : 'right';
    let validMove = true;
    if (startNumber > endNumber) {
      let numberTracker = startNumber;
      while (numberTracker !== endNumber) {
        numberTracker--
        if (
          numberTracker !== startNumber
          && $(`#${reverseLetter[startLetterIndex]}${numberTracker}`)[0].className.split(' ').indexOf('empty') === -1
          && numberTracker !== endNumber) {
            validMove = false;
        }
      }
    }
    if (startNumber < endNumber) {
      let numberTracker = startNumber;
      while (numberTracker !== endNumber) {
        numberTracker++
        if (
          numberTracker !== startNumber
          && $(`#${reverseLetter[startLetterIndex]}${numberTracker}`)[0].className.split(' ').indexOf('empty') === -1
          && numberTracker !== endNumber) {
            validMove = false;
        }
      }
    }
    if (startLetterIndex > endLetterIndex) {
      let numberTracker = startNumber;
      let letterTracker = startLetterIndex
      while (letterTracker !== endLetterIndex) {
        letterTracker--
        if (letterTracker !== startLetterIndex
          && $(`#${reverseLetter[letterTracker]}${numberTracker}`)[0].className.split(' ').indexOf('empty') === -1
          && letterTracker !== endLetterIndex
        ) {
          validMove = false;
        }
      }
    }
    if (startLetterIndex < endLetterIndex) {
      let numberTracker = startNumber;
      let letterTracker = startLetterIndex;
      while (letterTracker !== endLetterIndex) {
        letterTracker++
        if (
          letterTracker !== startLetterIndex
          && $(`#${reverseLetter[letterTracker]}${numberTracker}`)[0].className.split(' ').indexOf('empty') === -1
          && letterTracker !== endLetterIndex
        ) {
          validMove = false;
        }
      }
    }
    return validMove
  }
  const bishopValid = (clickedId, targetSpace, checkCheck = false, piece) => {
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    const value = bishopChecker(clickedId, targetSpace, checkCheck);
    if (value) {
      let image;
      if (piece === 'bishop') {
        image = currentPlayer === 'black' ? images.blackbishop : images.whitebishop;
      } if (piece === 'queen') {
        image = currentPlayer === 'black' ? images.blackqueen : images.whitequeen;
      }
      if (!checkCheck) {
        $(`#${clickedId}`).text(clickedId).removeClass(`owner${currentPlayer} ${piece} clicked`).addClass('empty')
        $(`#${clickedId}`).empty()
        $(`#${targetSpace.id}`)
          .removeClass(`owner${currentPlayer === 'white' ? 'black' : 'white'} empty pawn knight queen king rook bishop`)
          .addClass(`owner${currentPlayer} ${piece}`).text('')
        $(`<img src=${image} />`).appendTo($(`#${targetSpace.id}`))
        checkChecker('bishop', targetId);

        clickState = false;
        clickedId = ''
        currentPlayer = swapCurrentPlayer();
      } else {
        if (currentPlayer === 'white') inCheckBlack = true;
        if (currentPlayer === 'black') inCheckWhite = true;
        return { inCheckBlack, inCheckWhite }

      }
    }
  }
  const bishopChecker = (clickedId, targetSpace, checkCheck = false) => {
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    if (currentSpace[0] === targetId[0] || currentSpace[1] === targetId[1]) {
      if (!checkCheck) alert('invalid move')
      return;
    }
    if (Math.abs(
      reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0])) !==
      Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1]))) {
        if (!checkCheck) alert('invalid move')
        return;
    }
    let pass = noBlockersBishop(currentSpace, targetId)
    if (!pass) {
      if (!checkCheck) alert('invalid move')
      return;
    }
    return true;
  }
  const noBlockersBishop = (currentSpace, targetId) => {
    const startLetter = currentSpace[0];
    const startLetterIndex = reverseLetter.indexOf(startLetter);
    const endLetter = targetId[0];
    const endLetterIndex = reverseLetter.indexOf(endLetter);
    const startNumber = parseInt(currentSpace[1])
    const endNumber = parseInt(targetId[1]);
    const leftRight = startLetterIndex > endLetterIndex ? 'left' : 'right';
    validMove = true;
    if (startNumber > endNumber) {
      let numberTracker = startNumber;
      let letterTracker = startLetterIndex;
      while (numberTracker !== endNumber) {
        numberTracker--
        letterTracker -= leftRight === 'left' ? 1 : -1;
        if (
          numberTracker !== startNumber
          && $(`#${reverseLetter[letterTracker]}${numberTracker}`)[0].className.split(' ').indexOf('empty') === -1
          && numberTracker !== endNumber) {
            validMove = false;
        }
      }
    }
    if (startNumber < endNumber) {
      let numberTracker = startNumber;
      let letterTracker = startLetterIndex;
      while (numberTracker !== endNumber) {
        numberTracker++
        letterTracker -= leftRight === 'left' ? 1 : -1;
        if (
          numberTracker !== startNumber
          && $(`#${reverseLetter[letterTracker]}${numberTracker}`)[0].className.split(' ').indexOf('empty') === -1
          && numberTracker !== endNumber) {
            validMove = false;
        }
      }
    }
    return validMove
  }
  const queenValid = (clickedId, targetSpace, checkCheck = false, piece) => {
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    if (currentSpace[0] === targetId[0] || currentSpace[1] === targetId[1]) {
      rookValid(clickedId, targetSpace, false, 'queen')
    } else {
      bishopValid(clickedId, targetSpace, false, 'queen')
    }
  }
  const knightValid = (clickedId, targetSpace, checkCheck = false) => {
    const piece = 'knight'
    let currentSpace = clickedId.split('')
    let targetedSpace = targetSpace
    const targetId = targetedSpace.id.split('')
    const image = currentPlayer === 'black' ? images.blackknight : images.whiteknight;
    if (Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1])) > 2
      || Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0]) > 2)) {
        if (!checkCheck) alert('invalid move')
      return;
    }
    if (Math.abs(Math.abs(parseInt(currentSpace[1]) - parseInt(targetId[1]))
      - Math.abs(reverseLetter.indexOf(currentSpace[0]) - reverseLetter.indexOf(targetId[0]))) !== 1) {
        if (!checkCheck) alert('invalid move')
      return;
    }
    if (!checkCheck) {
      $(`#${clickedId}`).text(clickedId).removeClass(`owner${currentPlayer} ${piece} clicked`).addClass('empty')
      $(`#${clickedId}`).empty()
      $(`#${targetSpace.id}`)
        .removeClass(`owner${currentPlayer === 'white' ? 'black' : 'white'} empty pawn knight queen king rook bishop`)
        .addClass(`owner${currentPlayer} ${piece}`).text('')
      $(`<img src=${image} />`).appendTo($(`#${targetSpace.id}`))
      checkChecker('knight', targetId);

      clickState = false;
      clickedId = ''
      currentPlayer = swapCurrentPlayer();
    } else {
      if (currentPlayer === 'white') inCheckBlack = true;
      if (currentPlayer === 'black') inCheckWhite = true;
      return { inCheckBlack, inCheckWhite }

    }
  }
  const isValidMove = (piece, clickedId, targetSpace, checkCheck) => {
    if (targetSpace.className.indexOf(`owner${currentPlayer}`) > -1) {
      if (!checkCheck) alert('invalid move')
      return;
    }
    const functionByPiece = {
      pawn: () => (pawnValid(clickedId, targetSpace, checkCheck)),
      rook: () => (rookValid(clickedId, targetSpace, checkCheck, 'rook')),
      bishop: () => (bishopValid(clickedId, targetSpace, checkCheck, 'bishop')),
      knight: () => (knightValid(clickedId, targetSpace, checkCheck)),
      queen: () => (queenValid(clickedId, targetSpace, checkCheck, 'queen')),
      king: () => (kingValid(clickedId, targetSpace, checkCheck)),
    }
    return functionByPiece[piece]()
  };
  const swapCurrentPlayer = () => {
    return currentPlayer === 'white' ? 'black' : 'white';
  }
  const checkChecker = (piece, currentSpace) => {
    const opposingPlayer = swapCurrentPlayer();
    const enemyKing = $(`.owner${opposingPlayer}.king`)[0]
    console.log(isValidMove(piece, currentSpace.join(''), enemyKing, true));
  }
  boardSetup();
});
