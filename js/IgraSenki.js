let totalTime=60;
let delayTime=2;
let totalScore=0;
let scoreIncrease=10;
let infoText;
let mainTimer=null;
let stepTimer=null;
let main_img;
let numbers=[1,2,3,4,5,6,7,8,9,10,
            11,12,13,14,15,16,17,18,19,20,
            21,22,23,24,25,26,27,28,29,
            30,31,32,33,34,35,36,37,38,39,40,41];
let box=new Array();;
let rand_nums=new Array();
let rand_index=0;
let flag;
let pauseBtn;
let correctSound;
let wrongSound;
let stopSound;
let endTime=false;

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {

        this.load.image('right', 'assets/right.png');
        this.load.image('wrong', 'assets/wrong.png');


        for(var i=0;i<numbers.length;i++){
            this.load.image('img'+numbers[i]+'_1', 'assets/shadow/'+numbers[i]+'_1.png');
            this.load.image('shadow'+numbers[i]+'_2', 'assets/shadow/'+numbers[i]+'_2.png');
        }
    }

    create ()
    {

        pauseBtn=this.add.image(775,25, 'pause');
        pauseBtn.setInteractive();
        pauseBtn.on('clicked', this.pauseHandler, this);
        this.createBox();

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);

        this.add.text(70, 67, 'Find the shadows of the object above', { font: '40px Arial', fill: '#000' });
        infoText = this.add.text(10, 10, '', { font: '32px Arial', fill: '#000' });

        mainTimer = this.time.addEvent({ delay: totalTime*1000, callback: this.gameOver, callbackScope: this });
    }

    update ()
    {
        var currentTime=Math.floor( (totalTime*1000 - mainTimer.getElapsed())/1000 );
        infoText.setText('Time: ' + currentTime +'    Score: '+totalScore);
        if(currentTime<3 && !endTime){
            endTime=true;
            stopSound.play();
        }
    }
    pauseHandler()
    {
        $('#pauseGame').modal({escapeClose: false,clickClose: false,showClose: false});
        mainTimer.paused = true;
        if (stepTimer != null)
            stepTimer.paused = true;
    }
    createBox()
    {
        rand_index=Phaser.Math.Between(0,8);
        rand_nums[0]=Phaser.Math.Between(0,4);
        rand_nums[1]=Phaser.Math.Between(5,8);
        rand_nums[2]=Phaser.Math.Between(9,12);
        rand_nums[3]=Phaser.Math.Between(13,16);
        rand_nums[4]=Phaser.Math.Between(17,20);
        rand_nums[5]=Phaser.Math.Between(21,24);
        rand_nums[6]=Phaser.Math.Between(25,29);
        rand_nums[7]=Phaser.Math.Between(30,34);
        rand_nums[8]=Phaser.Math.Between(35,39);
        main_img=this.add.image(400,200,'img'+numbers[rand_nums[rand_index]]+'_1');
        main_img.scaleX=0.8;
        main_img.scaleY=0.8;

        for(var i=0;i<9;i++){
            box[i] = this.add.image(250+150*Math.floor(i/3),340+100*(i%3), 'shadow'+numbers[rand_nums[i]]+'_2');
            box[i].name=numbers[rand_nums[i]];
            box[i].scaleX=0.6;
            box[i].scaleY=0.6;
           
            box[i].setInteractive();
            box[i].on('clicked', this.clickHandler, this);
        }
    }
    clickHandler (box)
    {
        if(box.name==numbers[rand_nums[rand_index]]){
            flag=this.add.image(400,300,'right');
            totalScore+=scoreIncrease;

        }
        else{
            flag=this.add.image(400,300,'wrong');

        }
        this.checkbox();
    }
    checkbox()
    {
        for(var i=0;i<9;i++){
            box[i].off('clicked', this.clickHandler);
            box[i].input.enabled = false;
        }
        stepTimer=this.time.addEvent({ delay: delayTime*1000, callback: this.removebox, callbackScope: this });
    }
    removebox()
    {
        main_img.setVisible(false);
        for(var i=0;i<9;i++){
            box[i].setVisible(false);
        }
        flag.setVisible(false);
        this.createBox();
    }
    gameOver ()
    {
        if (stepTimer != null)
            stepTimer.paused=true;
        this.input.off('gameobjectup');
        $('#score-val').html(totalScore);
        $('#gameover').modal({escapeClose: false,clickClose: false,showClose: false});
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor:'#fefbd8',
    scene: [ Example ]
};

const game = new Phaser.Game(config);
