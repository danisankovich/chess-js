$(document).ready(() => {
  const boardSetup = () => {
    let cellHeightTotal = 8;
    const boardObject = { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'E',
      '6': 'F', '7': 'G', '8': 'H' }
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
    let clickState = false;
    let clickedId = '';
    $('.cell').on('click', (e) => {
      if (!clickState) {
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
        isValidMove(piece);
      }
    })
  }
  const isValidMove = (piece) => {
    console.log(piece)
  };
  boardSetup();
});
