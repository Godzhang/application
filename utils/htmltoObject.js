function htmltoObject(html){
    // console.log(html);
    let subtitle = html.match(/<h2 class="question-title">(.*?)<\/h2>/)[1];
    let avatarImg = html.match(/<img class="avatar" src="([^"]*?)">/)[1];
    let avatarName = html.match(/<span class="author">(.*?)<\/span>/)[1];
    let avatarJob = html.match(/<span class="bio">(.*?)<\/span>/)[1];
    
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