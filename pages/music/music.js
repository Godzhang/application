Page({
    data: {
        value: '',
        songs: [],
        showTip: false,
        showList: false,
        showNote: false,
        offset: 0,
        noteList: []
    },
    changeSearchWord(e){
        let searchWord = e.detail.value;
        this.setData({
            value: searchWord,
            showTip: false,
            showNote: false,
            showList: true
        });
        this.getSearchSuggest(searchWord);
    },
    //获取搜索提示词
    getSearchSuggest(value){
        let self = this;

        wx.request({
            url: `http://localhost:3000/search/suggest?keywords=${value}`,
            success(res){
                console.log(res);
                let artist = res.data.result.artists,
                    songs = res.data.result.songs;

                if(!Array.isArray(artist)){
                    artist = [];
                }
                if(!Array.isArray(songs)){
                    songs = [];
                }

                self.setData({
                    noteList: [].concat(artist, songs)
                })
            }
        });
    },
    clearInput(){
        this.setData({
            value: '',
            songs: []
        });
    },
    startSearch(){
        let self = this;
        let value = this.data.value;
        let offset = this.data.offset;
        if(value.length === 0) return;

        this.setData({
            showTip: true,
            showNote: true,
            showList: false,
            songs: [],
            noteList: [],
            offset: 0
        });

        wx.request({
            url: `http://localhost:3000/search?offset=${offset}&keywords=${value}`,
            success(res){
                console.log(res);
                self.setData({
                    songs: res.data.result.songs,
                    offset: offset + 30
                });
            }
        });
    },
    //搜索提示词
    searchNote(e){
        let searchWord = e.currentTarget.dataset.name;
        this.setData({
            value: searchWord
        });
        this.startSearch();
    },
    //加载更多
    loadMore(){
        let self = this;
        let songs = this.data.songs;
        let value = this.data.value;
        let offset = this.data.offset;

        wx.request({
            url: `http://localhost:3000/search?limit=15&offset=${offset}&keywords=${value}`,
            success(res){
                let newSongsList = res.data.result.songs;
                if(!newSongsList.length) return;
                self.setData({
                    songs: songs.concat(newSongsList),
                    offset: offset + 15
                });
            }
        });
    }
})