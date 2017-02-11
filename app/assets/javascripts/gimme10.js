//var toTypeString = ""; //
var currentPos = 0;
var charId = currentPos + 1;
var nextPos = 0;
var currentLine = 1;
var nextLine = 0;
var lines = [];
//var nextChar = new Object;
var lastCharPosition;
var status = '';

$(document).ready(function() {
  parseLines('line');
  $("p[class^='line']").lettering();

  //parseToTypeString();

  //$('#to-type').lettering();
  // $("#to-type").lettering('lines');
  //$("p[class^='line']").lettering(lines).children('span').lettering();

  //$('.line2').lettering();
  // //$('#to-type').lettering('lines').children('div').lettering();
});

function parseLines(line_class) {
  $("p[class^='" + line_class +"']").each(function(i, obj) {
    lineContent = $('.line' + (i+1)).text().trim();
    if ( i == 0 ) {
      lines[i+1] = lineContent;
    } else {
      lines[i+1] = '|' + lineContent;
    }
  });

  if(lines.length > 1){
    nextLine = 2;
  }
}

function getExpectedChar() {
  if( lines[currentLine] ){

    var inCurrentLine = nextPos < lines[currentLine].length
    var inNextLine = ( nextPos >= lines[currentLine].length && lines[nextLine].length > 0 )

    if( inCurrentLine ){

      return lines[currentLine][nextPos];

    }else if( inNextLine ){

      currentLine +=1;
      currentPos = 0;
      nextPos = 0;
      if( lines[currentLine] ){
        return lines[currentLine][nextPos];
      }else{
        return null;
      }

    }else{
      console.log('Exception in getExpectedChar!');
    }
  }else{
    return null;
  }
}

function getCharId(){
  if( currentLine > 1 ){
    return nextPos;
  }
  else{
    return nextPos + 1;
  }
}

function setCharDone(line_no, char_id){
  $('.line' + line_no + ' .char' + char_id).css('color', 'black');
}

function isLastChar(){
  isLastLine = ( currentLine == lines.length-1 );
  isLastCharInLine = ( currentPos == lines[currentLine].length-1 );
  return (isLastLine && isLastCharInLine)
}

function moveToNextChar(){
  currentPos += 1;
  nextPos += 1;
}

document.onkeydown = function(event) {
  if( status != 'finished'){

    expected_char = getExpectedChar();
    pressedNewline = ( expected_char == '|' && event.key == 'Enter' );
    pressedCorrectKey = ( event.key == expected_char && expected_char != '|' );

    if (pressedNewline){

      moveToNextChar();

    }else if( pressedCorrectKey ) {

      charId = getCharId();
      setCharDone(currentLine, charId);

      if( isLastChar() ){
        status = 'finished';
        setTimeout(function(){ alert("Finished!"); }, 2);
        return event.returnValue;
      }

      hasNextChar = ( lines[currentLine][nextPos] || lines[nextLine][0] != '' );
      if( hasNextChar ){
        moveToNextChar();
      }
    }
    return event.returnValue;
  }
}