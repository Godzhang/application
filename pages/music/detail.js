Page({
    data: {
        musicUrl: '',
        musicCover: '',
        isStop: false,
        playing: false
    },
    audio: null,
    onLoad(options){
        let musicId = options.id;
        let self = this;

        wx.request({
            url: `http://localhost:3000/music/url?id=${musicId}`,
            success(res){
                let url = res.data.data[0].url;
                if(!url){
                    wx.showModal({
                        title: '错误',
                        content: '资源错误',
                        showCancel: false
                    });
                    return;
                }
                // console.log(res);
                self.setData({
                    musicUrl: res.data.data[0].url
                });
                self.playMusic();
            }
        });
        //获取歌曲封面，名字
        wx.request({
            url: `http://localhost:3000/song/detail?ids=${musicId}`,
            success(res){
                self.setData({
                    musicCover: res.data.songs[0].al.picUrl
                });
                wx.setNavigationBarTitle({
                    title: res.data.songs[0].name
                });
            }
        });
    },
    playMusic(){
        let audio = wx.getBackgroundAudioManager();
        audio.src = this.data.musicUrl;

        //监听音频事件
        audio.onPlay(() => {
            this.setData({
                isStop: false,
                playing: true,
            });
        });
        audio.onPause(() => {
            this.setData({
                playing: false
            });
        });
        audio.onStop(() => {
            this.setData({
                isStop: true,
                playing: false
            });
        });
        audio.onEnded(() => {
            this.setData({
                playing: false
            });
        });
    },
    onUnload(){
        let audio = wx.getBackgroundAudioManager();
        audio.stop();
    },
    play(){
        let audio = wx.getBackgroundAudioManager();

        if(this.data.isStop){
            this.playMusic();
        }else{
            audio.play();
        }
    },
    pause(){
        let audio = wx.getBackgroundAudioManager();
        audio.pause();
    },
    stop(){
        let audio = wx.getBackgroundAudioManager();
        audio.stop();
    }
})