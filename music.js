class Music {

    constructor(title, singer, thumbnail, file) {

        this.title = title;
        this.singer = singer;
        this.thumbnail = thumbnail;
        this.file = file;



    }


    getName() {
        return this.singer + " - " + this.title;
    }

}

const musicList = [

    new Music("Clay", "Ghostly Kisses", "Clay.png", "Ghostly Kisses - Clay.mp3"),
    new Music("Unshaken", "D'Angelo", "Dangelo_Unshaken.png", "D'Angelo_Unshaken.mp3"),
    new Music("Nordurljos", "SKALD", "Skald.png", "SKALD.mp3"),
    new Music("Valhalla Calling Me", "Miracle of Sound", "Valhala_Calling.png", "ValhallaCallingMe.mp3"),

]