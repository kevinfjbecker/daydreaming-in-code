export default class ResizeManager
{
    constructor(parentDivId, canvasId)
    {
        this.parentDiv = document.getElementById(parentDivId);
        this.canvas = document.getElementById(canvasId);

        this.resizeCanvas();

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas()
    {
        const parentStyle = window.getComputedStyle(this.parentDiv);

        const width = parseInt(parentStyle.getPropertyValue('width'));
        const height = parseInt(parentStyle.getPropertyValue('height'));

        this.canvas.width = width;
        this.canvas.height = height;
    }
}
