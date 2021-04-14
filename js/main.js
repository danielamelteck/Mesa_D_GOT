(() => {
    console.log('fired');

    //varibles at the top
    const sigils = document.querySelector('#navList'),
        banner = document.querySelector('#houseImages'),
        lightBox = document.querySelector(".lightbox"),
        vid = lightBox.querySelector('video'),
        houseName = document.querySelector('h1'),
        houseTitle = document.querySelector('.houseTitle'),
        houseDescription = document.querySelector('.house-info'),
        play = document.querySelector('.play'),
        pause = document.querySelector('.pause'),
        rewind = document.querySelector('.rewind'),
        mute = document.querySelector('.mute'),
        bar = document.querySelector('.initialBar'),
        progressBar = document.querySelector('.progressBar');


    // adding house info using arrays -> this is what you would do for FIP as well
    const houseInfo = [
        ['Stark', `House Stark of Winterfell is a Great House of Westeros,
        ruling over the vast region known as the North from their seat in Winterfell.
        It is one of the oldest lines of Westerosi nobility by far, claiming a line
        of descent stretching back over eight thousand years. Before the Targaryen conquest,
        as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros,
         the leaders of House Stark ruled over the region as the Kings in the North.`],//houseInfo[0][0] -> gets the first index of the subarray (the house name)
        ['Baratheon', `House Baratheon of Storm's End is a legally extinct Great House of Westeros.
         A cadet branch was formerly the royal house, but House Lannister now controls the throne.
          House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros,
          aptly named for its frequent storms, from their seat of Storm's End.
         House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a
          rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended
           the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.`],//houseInfo[1][1] -> gets the second index of the subarray (the house description)
        ['Lannister', `House Lannister of Casterly Rock is one of the Great Houses of Westeros,
         one of its richest and most powerful families and oldest dynasties. It is also the current
         royal house of the Seven Kingdoms following the extinction of House Baratheon of King's
         Landing, which had been their puppet house anyway.
         The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky
         promontory overlooking the Sunset Sea which has had habitations and fortifications built
         into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of
          the West. As the new royal house, they also rule directly over the Crownlands from their
          seat of the Red Keep in King's Landing, the traditional seat of the royal family.`],
        ['Tully', `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior
        member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the
        Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The
        Tully sigil is a silver trout on a red and blue background. Their house words are
         "Family, Duty, Honor.`],
        ['Greyjoy', `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over
        the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros,
         from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.
        House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words
        are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely
        associated with House Greyjoy and their bannermen, as they are associated with the faith
        of the Drowned God. `],
        ['Arryn', `House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled
         over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and
         more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen
         kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn,
         the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until
         he reaches the age of majority. `],

        ['TARGERYEN', `House Targaryen of Dragonstone is a Great House of Westeros and was the ruling
         royal House of the Seven Kingdoms for three centuries since it conquered and unified the realm, 
         before it was deposed during Robert's Rebellion and House Baratheon replaced it as the new royal House. 
         The few surviving Targaryens fled into exile to the Free Cities of Essos across the Narrow Sea. Currently
         based on Dragonstone off of the eastern coast of Westeros, House Targaryen seeks to retake the Seven
         Kingdoms from House Lannister, who formally replaced House Baratheon as the royal House following the 
         destruction of the Great Sept of Baelor.`],

        ['FREY', `House Frey of the Twins was the Great House of the Riverlands, having gained their position 
        for their treachery against their former liege lords, House Tully, who were stripped of all their lands 
        and titles for their rebellion against the Iron Throne; House Tully had supported the independence movement
        for the Kingdom of the North. The current head of the house is unknown following the assassinations of Lord
        Walder Frey and two of his sons, Lothar Frey and Walder Rivers, by the vengeful Arya Stark. This is made more
         complex by the subsequent assassination of all the male Freys soon after.`],

        ['Tyrell', `House Tyrell of Highgarden is an extinct Great House of Westeros. It ruled over the Reach, a vast,
         fertile, and heavily-populated region of southwestern Westeros, from their castle-seat of Highgarden as Lords 
         Paramount of the Reach and Wardens of the South after taking control of the region from House Gardener during the Targaryen conquest.`]

    ];
    // video control here 
    function playControl(event) {
        if (vid.paused == true) {
            vid.play()
            barRate = setInterval(progressRate, 600);


        }
    }
    function pauseControl(event) {
        if (vid.paused == false) {
            vid.pause();

        }
    }
    function rewindControl(event) {
        vid.currentTime = 0;
    }

    function muteControl(event) {
        if (vid.muted) {
            vid.muted = false;
            mute.innerHTML = "Mute";
        } else {
            vid.muted = true;
            mute.innerHTML = "Unmute";
        }
    }



    // for progress bar moving play rate
    var barSize = 600;
    function progressRate(event) {
        if (!vid.ended) {
            var size = parseInt(vid.currentTime * barSize / vid.duration);
            progressBar.style.width = size + 'px';
        } else {
            progressBar.style.width = '0px';
            window.clearInterval(barRate);
            //when video play time run out, close the lightbox automatically
            size > 600;
            lightBox.classList.remove('show-lightbox');


        }

    }

    // click the progress bar to move forward or move back
    function clickedBar(event) {
        if (!vid.paused && !vid.ended) {
            var mouseX = event.pageX - bar.offsetLeft;
            var newrate = mouseX * vid.duration / barSize;
            vid.currentTime = newrate;
            progressBar.style.width = mouseX + 'px';
        }
    }


    // function playVideo() {
    //     vid.play();
    // }

    // function stopVideo() {
    //     vid.pause();
    //     vid.currentTime = 0;
    // }



    function setHouseData(name, desc) {
        houseName.textContent = `House ${name}`;
        houseTitle.textContent = ` House - ${name}`;
        houseDescription.textContent = desc;
    }


    function setVideoSource(house) {
        // debugger;
        //set the video source, load it and then play it
        let targetSource = `video/House-${house.charAt(0).toUpperCase() + house.slice(1)}.mp4`;
        //baratheon => Baratheon, or stark =>Stark

        vid.src = targetSource;
        vid.load();
        // playVideo();
        playControl();


    }

    // functions go in the middle
    function animateBanner(event) {
        if (event.target.className.includes('sigilContainer')) {
            let multiplier = event.target.dataset.offset,
                offsetWidth = 600;

            // 0 ,600, 1200,1800px depending on the math
            banner.style.right = `${multiplier * offsetWidth}px`;

        }

    }


    // new funciton for lightbox here-------------
    function popLightBox(event) {
        //change the house title text on the page

        // add a class to open the lightbox
        if (event.target.className.includes('sigilContainer')) {
            // lightBox.classList.add('show-lightbox');
            setTimeout(function () { lightBox.classList.add('show-lightbox'); }, 1000);//waiting for the banner animation done then pop up the video

            let targetHouse = event.target.className.split(" ")[1];
            // "baratheon" ,"stark", "tully" etc
            setVideoSource(targetHouse);


            //this might not be the best spot for this function invocation
            // set the house data by running the sethouseData function and passing data into it. 
            setHouseData(houseInfo[event.target.dataset.offset][0], houseInfo[event.target.dataset.offset][1]);

            lightBox.querySelector('.close').addEventListener('click', () => {
                // stopVideo();
                pauseControl();

                lightBox.classList.remove('show-lightbox');
            })
        }

    }

   

    // sigils.forEach(sigil => sigil.addEventListener('click', animateBanner));
    sigils.addEventListener('click', animateBanner);


    // new here 
    sigils.addEventListener('click', popLightBox);




    // for video control
    play.addEventListener('click', playControl);
    pause.addEventListener('click', pauseControl);
    rewind.addEventListener('click', rewindControl);
    mute.addEventListener('click', muteControl);



    // for progress bar
    bar.addEventListener('click', clickedBar, false);
    progressBar.addEventListener('click', progressRate);

})();