var colors = []
// Prevent from closing dropdown-menu when clicking on it
$('#settings').on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
});

$('#code').on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
});

// Set up the ability to flash a message on screen
function tempAlert(msg, duration, id) {
    var parent = document.getElementById(id)
    var flashCopy = document.createElement("span");
    flashCopy.setAttribute("style","position:relative;bottom:8px;");
    flashCopy.innerHTML = msg;

    setTimeout(function(){
        flashCopy.parentNode.removeChild(flashCopy);
    }, duration);

    parent.appendChild(flashCopy);
}

// Flash 'Copied!' when color ids/css is clicked.
$('#gradientID').click(function(){
   tempAlert('Copied!', 1000, 'copyGradient');
});

$('#idContainerOne').click(function(){
   tempAlert('Copied!', 1000, 'copyOne')
});

$('#idContainerTwo').click(function(){
   tempAlert('Copied!', 1000, 'copyTwo')
});

$('#idContainerThree').click(function(){
   tempAlert('Copied!', 1000, 'copyThree')
});

var currentColor = ''
var direction = ''
var colorOneID = ''
var colorTwoID = ''
var colorThreeID = ''
// Custom Gradient

// Change the color display circle to current colors
$('#colorOne').change(function(){
    $('#colorWrapperOne').css('background', this.value);
    colorOneID = this.value;
    return colorOneID
});

$('#colorTwo').change(function(){
    $('#colorWrapperTwo').css('background', this.value);
    colorTwoID = this.value;
    $('#colorTwoID').text(colorTwoID)
    return colorTwoID
});

$('#colorThree').change(function(){
    $('#colorWrapperThree').css('background', this.value);
    colorThreeID = this.value;
    $('#colorThreeID').text(colorThreeID)
    return colorThreeID
});

// Allow user to select a direction
$('#direction').change(function(){
    if( $(this).val() === 'angle'){
        $('#angleBox').append('<input id="myInput" class="text-center" type="number" />').css('color', 'black');
        $('#myInput').change(function(){
            direction = this.value+'deg'
        });
    } else{
        $('#myInput').remove();
        direction = 'to '+this.value
        return direction
    }
});

// Disable colors, showing a cross out circle depending on color amount
var toggleCancel = 'fas fa-ban slash'

$('#numOfColors').change(function(){
    if($('#numOfColors').val() === '1') {
        $('#colorOneCancel').removeClass(toggleCancel);
        $('#colorTwoCancel').addClass(toggleCancel);
        $('#colorThreeCancel').addClass(toggleCancel);
        $('#addPadding').removeClass('pt-4')
        $('#addPadding').removeClass('mt-2')
    }

    if($('#numOfColors').val() === '2') {
        $('#colorOneCancel').removeClass(toggleCancel);
        $('#colorTwoCancel').removeClass(toggleCancel);
        $('#colorThreeCancel').addClass(toggleCancel);
        $('#addPadding').removeClass('pt-4')
        $('#addPadding').removeClass('mt-2')
    }

    if($('#numOfColors').val() === '3') {
        $('#colorOneCancel').removeClass(toggleCancel);
        $('#colorTwoCancel').removeClass(toggleCancel);
        $('#colorThreeCancel').removeClass(toggleCancel);
        $('#addPadding').addClass('pt-4')
        $('#addPadding').addClass('mt-2')
    }
});


var link = ''
// Update the display to show custom color. 
$('#updateDisplay').click(function(){
    // If not direction is selected, flash a error.
    if(direction === '' && $('#numOfColors').val() !== '1'){
       tempAlert('Select a direciton', 1000, 'addPadding')
    } 

    // If color is changed from black, set it to black. Value is undefined unless changed, so we must manually set it.
    if(colorOneID.length === 0) {
        colorOneID = '#000000';
    }

    if(colorTwoID.length === 0) {
        colorTwoID = '#000000';
    }

    if(colorThreeID.length === 0) {
        colorThreeID = '#000000';
    }

    // Display colors, showing if there are any cancelled out.

    if($('#numOfColors').val() === '1') {
        $('#display').css('background', colorOneID);
        link = 'background-color: ' + colorOneID
        $('#gradientID').text(link);
        $('#idContainerTwo').text(colorOneID);
        $('#idContainerOne').text('');
        $('#idContainerThree').text('');

        $('#idWrapperOne').removeClass('circle');
    
        $('#idWrapperTwo').addClass('circle');
        $('#idWrapperTwo').css('background', colorOneID);

        $('#idWrapperThree').removeClass('circle');
    }

    if($('#numOfColors').val() === '2') {
        $('#display').css({
            background: 'linear-gradient('+direction+', '+ colorOneID + ', '+ colorTwoID +')'
        });
        link = 'background: linear-gradient('+direction+', '+ colorOneID + ', '+ colorTwoID +')'
        $('#gradientID').text(link);
        $('#idContainerOne').text(colorOneID)
        $('#idContainerThree').text(colorTwoID)
        $('#idContainerTwo').text('')

        $('#idWrapperOne').addClass('circle');
        $('#idWrapperOne').css('background', colorOneID);
    
        $('#idWrapperTwo').removeClass('circle');

        $('#idWrapperThree').addClass('circle');
        $('#idWrapperThree').css('background', colorTwoID);
    }

    if($('#numOfColors').val() === '3') {
        $('#display').css({
            background: 'linear-gradient('+direction+', '+ colorOneID + ', '+ colorTwoID +', '+ colorThreeID +')'
        });
        link = 'background: linear-gradient('+direction+', '+ colorOneID + ', '+ colorTwoID +', '+ colorThreeID +')'
        $('#gradientID').text(link);
        $('#idContainerOne').text(colorOneID)
        $('#idContainerTwo').text(colorTwoID)
        $('#idContainerThree').text(colorThreeID)

        $('#idWrapperOne').addClass('circle');
        $('#idWrapperOne').css('background', colorOneID);
    
        $('#idWrapperTwo').addClass('circle');
        $('#idWrapperTwo').css('background', colorTwoID);

        $('#idWrapperThree').addClass('circle');
        $('#idWrapperThree').css('background', colorThreeID);
    }
});


// GRADIENTS RANDOM

var link = ''
var chosenDirection = ''
var angleDeg = ''
var data = ''
var track = -1
var firstColor = 1

// Generate a random color
$('#next').click(function(){

    if(track + 1 === colors.length || firstColor === 1) {
        track++
        var direct = Direction()
        var one = randomHexColor()
        var two = randomHexColor()
        link = 'background: linear-gradient('+direct+', '+ one + ', '+ two +')'
        storedLink = 'linear-gradient('+direct+','+ one+','+ two +')'
        $('#display').css({
            background: 'linear-gradient('+direct+','+ one+','+ two +')'
        })
        $('#gradientID').text(link);
        $('#idContainerOne').text(one)
        $('#idWrapperOne').addClass('circle')
        $('#idWrapperOne').css('background', one)
    
        $('#idContainerThree').text(two)
        $('#idWrapperThree').addClass('circle')
        $('#idWrapperThree').css('background', two)
    
        var oneToString = one.toString()
        var secondToString = two.toString()

        $('#idContainerTwo').text('')
        $('#idWrapperTwo').removeClass('circle')
    
        // Store colors into local session and push it into an object 
        colors.push({
            id: storedLink,
            first: oneToString,
            second: secondToString
        })
    
        sessionStorage.setItem('colors',JSON.stringify(colors));
        firstColor++
        return firstColor, track
    } 
    
    if (track + 1 < colors.length){
        track++
        $('#display').css({
            background: JSON.parse(sessionStorage.getItem("colors"))[track].id
        })

        $('#gradientID').text(JSON.parse(sessionStorage.getItem("colors"))[track].id);
        $('#idContainerOne').text(JSON.parse(sessionStorage.getItem("colors"))[track].first)
        $('#idWrapperOne').addClass('circle')
        $('#idWrapperOne').css('background', JSON.parse(sessionStorage.getItem("colors"))[track].first)
    
        $('#idContainerThree').text(JSON.parse(sessionStorage.getItem("colors"))[track].second)
        $('#idWrapperThree').addClass('circle')
        $('#idWrapperThree').css('background', JSON.parse(sessionStorage.getItem("colors"))[track].second)
        firstColor++
        return firstColor, track
    }

});


// Back track between previous randomly generated colors
$('#back').click(function(){
    if(track === 0 || firstColor === 1) {
    } else {
        track--
        $('#display').css({
            background: JSON.parse(sessionStorage.getItem("colors"))[track].id
        })
    
        $('#gradientID').text(JSON.parse(sessionStorage.getItem("colors"))[track].id);
        $('#idContainerOne').text(JSON.parse(sessionStorage.getItem("colors"))[track].first)
        $('#idWrapperOne').addClass('circle')
        $('#idWrapperOne').css('background', JSON.parse(sessionStorage.getItem("colors"))[track].first)
    
        $('#idContainerThree').text(JSON.parse(sessionStorage.getItem("colors"))[track].second)
        $('#idWrapperThree').addClass('circle')
        $('#idWrapperThree').css('background', JSON.parse(sessionStorage.getItem("colors"))[track].second)
        return track
    }
});



function customGradient(numOfColors) {
    var totalColors = [];
    for(let i = 0; i < numOfColors; i++) {
        totalColors[i] = randomHexColor();
    }
}


// Choose a random direction
function Direction(){
    var i = Math.floor(Math.random() * 5)
    if(i === 4){
        angle = Math.floor(Math.random() * 2)       
        if(angle == 0){
            angleDeg =- Math.floor(Math.random() * 180) 
            chosenDirection = angleDeg+'deg'
        } else {
            angleDeg = Math.floor(Math.random() * 180)     
            chosenDirection = angleDeg+'deg'
        }
    }
    
    if(i === 3) {
        chosenDirection = 'to top'
    }
    if(i === 2) {
        chosenDirection = 'to bottom'
    }
    if(i === 1) {
        chosenDirection = 'to right'
    }
    if(i === 0) {
        chosenDirection = 'to left'
    }
    return chosenDirection
}


// Create a random hexColor
function randomHexColor(){
    return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
} 


// Create a random RGB color
function randomColor(){
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Allow copying of code when clicked.
const wholeID = document.getElementById('gradientID');

wholeID.addEventListener('click', async () => {
  await navigator.clipboard.writeText(wholeID.textContent);
  const y = await navigator.clipboard.readText();
});

const firstID = document.getElementById('idContainerOne');

firstID.addEventListener('click', async () => {
  await navigator.clipboard.writeText(firstID.textContent);
  const y = await navigator.clipboard.readText();
});

const secondID = document.getElementById('idContainerTwo');

secondID.addEventListener('click', async () => {
  await navigator.clipboard.writeText(secondID.textContent);
  const y = await navigator.clipboard.readText();
});

const thirdID = document.getElementById('idContainerThree');

thirdID.addEventListener('click', async () => {
  await navigator.clipboard.writeText(thirdID.textContent);
  const y = await navigator.clipboard.readText();
});




