function htmltoObject(html){
    // console.log(html);
    let titleReg = /<h2 class="question-title">(.*?)<\/h2>/,
        avatarImgReg = /<img class="avatar" src="([^"]*?)">/,
        avatarNameReg = /<span class="author">(.*?)<\/span>/,
        avatarObjReg = /<span class="bio">(.*?)<\/span>/,
        subtitle = '',
        avatarImg = '',
        avatarName = '',
        avatarJob = '';
    
    if(titleReg.test(html)){
      subtitle = html.match(titleReg)[1];
    }
    if(avatarImgReg.test(html)){
      avatarImg = html.match(avatarImgReg)[1];
    }
    if(avatarNameReg.test(html)){
      avatarName = html.match(avatarNameReg)[1];
    }
    if(avatarObjReg.test(html)){
      avatarJob = html.match(avatarObjReg)[1];
    }

    let allContent = html.match(/<p>(.*?)<\/p>/g);
    allContent = allContent.map(val => {
        return val.replace(/<p>/g, '')
                  .replace(/<\/p>/g, '')
                  .replace(/<strong>/g, '')
                  .replace(/<\/strong>/g, '')
                  .replace(/<em>/g, '')
                  .replace(/<\/em>/g, '')
                  .replace(/<a[^>]*?>/g, '')
                  .replace(/<\/a>/g, '')
                  .replace(/<img[^>]*?>/g, '')
                  .replace(/<iframe[^>]*?>/g, '')
                  .replace(/<\/iframe>/g, '')
                  .replace(/&amp;/g, '·');
    });

    return {
        subtitle,
        avatarImg,
        avatarName,
        avatarJob,
        allContent
    }
}

export default htmltoObject;