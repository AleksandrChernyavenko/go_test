(function (exports, $) {
    'use strict';

    function myCanvas(params) {

        this.canvas = document.querySelector(params.containerSelector);
        this.$canvas = $(params.containerSelector);
        this.toolbarPenElement = document.querySelector(params.toolbarPen);
        this.toolbarThicknessElement = document.querySelector(params.toolbarThickness);

        this.selectedClass = "table-bordered";
        this.context = this.canvas.getContext("2d");
        this.isDrawing = false;
        this.previousColorElement = null;
        this.imageCopy = null;
        this.imageContainer = null;
        this.previousThicknessElement = null;
    }

    myCanvas.prototype.init = function () {

        this.canvas.onmousedown = this.startDrawing.bind(this);
        this.canvas.onmouseup =  this.stopDrawing.bind(this);
        this.canvas.onmouseout = this.stopDrawing.bind(this);
        this.canvas.onmousemove = this.draw.bind(this);

        this.attachEventHandlers();
    };

    myCanvas.prototype.attachEventHandlers = function () {

        this.toolbarPenElement.onclick = this.changeColor.bind(this);
        this.toolbarThicknessElement.onclick = this.changeThickness.bind(this);
    };


    myCanvas.prototype.startDrawing = function (e) {

        this.isDrawing = true;

        // Создаем новый путь (с текущим цветом и толщиной линии)
        this.context.beginPath();

        console.log(e.pageX,e.pageY);



        // Нажатием левой кнопки мыши помещаем "кисть" на холст
        this.context.moveTo(e.pageX - this.$canvas.offset().left, e.pageY - this.$canvas.offset().top);
    };

    myCanvas.prototype.stopDrawing = function (e) {
        this.isDrawing = false;
    };

    myCanvas.prototype.draw = function (e) {
        if (this.isDrawing == true)


        {
            // Определяем текущие координаты указателя мыши
            var x = e.pageX - this.$canvas.offset().left;
            var y = e.pageY - this.$canvas.offset().top;

            // Рисуем линию до новой координаты
            this.context.lineTo(x, y);
            this.context.stroke();
        }
    };


    myCanvas.prototype.clearCanvas = function (e) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    myCanvas.prototype.saveCanvas = function (e) {

        // Находим элемент <img>
        this.imageCopy = document.getElementById("savedImageCopy");

        // Отображаем данные холста в элементе <img>
        this.imageCopy.src = this.canvas.toDataURL();

        // Показываем элемент <div>, делая изображение видимым
        // делая изображение видимым
        this.imageContainer = document.getElementById("savedCopyContainer");
        this.imageContainer.style.display = "block";

    };


    myCanvas.prototype.changeColor = function (e) {
        event.stopPropagation();

        //     Меняем текущий цвет рисования
        this.context.strokeStyle = event.target.getAttribute("data-rgb");

        // Меняем стиль элемента <img>, по которому щелкнули
        event.target.className = this.selectedClass;

        // Возвращаем ранее выбранный элемент <img> в нормальное состояние
        if (this.previousColorElement != null)
            this.previousColorElement.className = "";

        this.previousColorElement = event.target;

        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    myCanvas.prototype.changeThickness =  function (e)
    {
        // Изменяем текущую толщину линии
        this.context.lineWidth = event.target.getAttribute("data-thickness");;

        // Меняем стиль элемента <img>, по которому щелкнули
        event.target.className = this.selectedClass;

        // Возвращаем ранее выбранный элемент <img> в нормальное состояние
        if (this.previousThicknessElement != null)
            this.previousThicknessElement.className = "";

        this.previousThicknessElement = event.target;
    };


    if (typeof define === 'function' && define.amd) {
        define(function () {
            return myCanvas;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = myCanvas;
    } else {
        exports.myCanvas = myCanvas;
    }

})(this, jQuery);