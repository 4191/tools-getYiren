{
    /* <div class="chapterlists flex flex-wrap peer-checked:flex-wrap-reverse md:peer-checked:flex-row-reverse md:flex-row gap-y-2 -mx-1"
    id="sortchapters" data-mid="24">
    <div class="chapteritem w-full md:w-1/2" data-index="0"><a href="/manga/yirenzhixia-dongmantang/24-047284830-734"
            data-ms="24" data-cs="1614918" data-ct="第705话 683" data-mslug="yirenzhixia-dongmantang">
            <div class="flex flex-row justify-between p-4 bg-default-50 rounded-lg md:mx-1"><span
                    class="chaptertitle text-sm font-medium truncate max-w-[300px]">第705话 683</span><span
                    class="text-sm italic text-default-500">5天前</span></div>
        </a></div>
    <div class="chapteritem w-full md:w-1/2" data-index="1"><a href="/manga/yirenzhixia-dongmantang/24-046861870-733"
            data-ms="24" data-cs="1613046" data-ct="第704话 682" data-mslug="yirenzhixia-dongmantang">
            <div class="flex flex-row justify-between p-4 bg-default-50 rounded-lg md:mx-1"><span
                    class="chaptertitle text-sm font-medium truncate max-w-[300px]">第704话 682</span><span
                    class="text-sm italic text-default-500">8月16日</span></div>
        </a></div>
    <div class="chapteritem w-full md:w-1/2" data-index="2"><a href="/manga/yirenzhixia-dongmantang/24-046336380-732"
            data-ms="24" data-cs="1610999" data-ct="第703话 681" data-mslug="yirenzhixia-dongmantang">
            <div class="flex flex-row justify-between p-4 bg-default-50 rounded-lg md:mx-1"><span
                    class="chaptertitle text-sm font-medium truncate max-w-[300px]">第703话 681</span><span
                    class="text-sm italic text-default-500">8月9日</span></div>
        </a></div>
</div> */
}

// 使用nodejs读取 ./mulu.txt
// 获取到所有的章节名称和链接
// 生成一个json文件，格式如下
// [{title:xx, href:xx},...]

// 读取文件
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const filePath = path.resolve(__dirname, './mulu.txt');
const content = fs.readFileSync(filePath, 'utf-8');

const $ = cheerio.load(content);
const chapters = $('.chapteritem')
    .toArray()
    .map((item) => {
        const $item = $(item);
        const title = $item.find('.chaptertitle').text();
        const href = $item.find('a').attr('href');
        return { title, href };
    });

fs.writeFileSync(
    path.resolve(__dirname, './mulu.json'),
    JSON.stringify(chapters, null, 4),
    'utf-8'
);
console.log('生成mulu.json成功');