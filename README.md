# Game trông giống Soul Knight
JSA Final Project
Preview: https://tulinh1311.github.io/jsa/

## Framework / Game Engine / Other Materials
* Phaser **3** ( https://phaser.io ) - rất thiên về JS, không có mấy CSS và HTML. 
  * Documentation: https://photonstorm.github.io/phaser3-docs/index.html
* Lấy hình ảnh cho nhân vật từ đây: https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Character-Generator
  * Bản preview: https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/
  * File: /resource/spritesheet.png 
* Map: Tutorial: https://youtu.be/_fK6MVLPrMA - sẽ dùng https://www.mapeditor.org để làm map và dùng tileset của https://0x72.itch.io/dungeontileset-ii
  * Định dang file của dungeon là JSON 
## Mục tiêu:
  ### Đợt 1: (đang làm)
  * Hoàn thiện bản đồ (map - 5 phòng), người chơi (player), quái.
  * Xây dựng stat cơ bản cho người chơi và quái.
  * Xây dựng logic game
  * Người chơi sẽ có duy nhất một skill, có thể update thêm skill, nhưng ở các đợt sau
  
  ### Đợt 2:
  * Xây dựng cửa hàng (vũ khí, khiên, giáp)
  * Làm cửa cho mỗi phòng
  * Xây dựng menu để người chơi xem stat.
  
  ### Đợt 3: tính sau
  
 ## Đã làm:
  * Xây dựng map và nhân vật
  * Xây dựng animation nhân vật
  * Nhân vật không thể đi xuyên qua tường
  * camera đi theo nhân vật
  * Thanh máu (hiển thị)
  * minimap
  * âm thanh nền và bật/tắt âm thanh
  * Start menu

## Giải thích file:
  * **index.js:** file js chính
  * **/resource:** folder đựng ảnh và map dungeon
  * **/module:** folder đựng các file js export để dùng trong index.js
