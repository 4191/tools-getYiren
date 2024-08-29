# encoding:utf-8
import os
import json
from bs4 import BeautifulSoup

path = '/Users/leung/Code/tools/yirenDownloader/mulu.txt'
with open(path, 'r', encoding='utf-8') as f:
    data = f.read()

soup = BeautifulSoup(data)
chapters = soup.find_all('div', attrs={'class': 'chapteritem'})
result = []
for chapter in chapters:
    # title = chapter.find('div', attrs={'class': 'chaptertitle'}).text, 考虑取不到的情况

# 32     ChapterTitle =soup.find(name='div',attrs={'class':'chaptertitle'}).text

# <div class="chapteritem w-full md:w-1/2" data-index="0">
#       <a href="/manga/yirenzhixia-dongmantang/24-047284830-734"
#             data-ms="24" data-cs="1614918" data-ct="第705话 683" data-mslug="yirenzhixia-dongmantang">

#             <div class="flex flex-row justify-between p-4 bg-default-50 rounded-lg md:mx-1">
# <span
#                     class="chaptertitle text-sm font-medium truncate max-w-[300px]">第705话 683</span><
# span
#                     class="text-sm italic text-default-500">5天前</></div>
#         </a>
# </div>
    tagA = chapter.find('a')
    href = chapter.find('a').get('href')

    titleWrap = tagA.find('div', attrs={'class': 'flex'})
    title = titleWrap.find('span', attrs={'class': 'chaptertitle'}).text if titleWrap.find('span', attrs={'class': 'chaptertitle'}) else ''

    # title = chapter.find(name='div',attrs={'class':'chaptertitle text-sm font-medium truncate max-w-[300px]'}).text if chapter.find(name='div',attrs={'class':'chaptertitle'}) else ''
    result.append({'title': title, 'href': href})

with open('./mulu.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)
print('生成mulu.json成功')
