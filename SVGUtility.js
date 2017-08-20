/**
 * This is the SVG utility
 */

SVGUtility = function fun$SVGUtility() {
    this.SVG_NAMESPACE = "http://www.w3.org/2000/svg";
}

SVGUtility.prototype = {
    createSVG: function createSVG(width, height) {
        let svg = document.createElementNS(this.SVG_NAMESPACE, "svg");
        if (width) { svg.setAttribute("width", width); }
        if (height) { svg.setAttribute("height",height); }
        return svg;
    },

    createGroup: function createGroup(svgClass) {
        let group = document.createElementNS(this.SVG_NAMESPACE, "g");
        if (svgClass) { group.setAttribute("class", svgClass); }
        return group;
    },

    createLine: function createLine(x1, y1, x2, y2, svgClass) {
        let line = document.createElementNS(this.SVG_NAMESPACE, "line");
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        if (svgClass) { line.setAttribute("class", svgClass); }
        return line;
    },

    createCircle: function createCircle(cx, cy, r, svgClass) {
        let circle = document.createElementNS(this.SVG_NAMESPACE, "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", r);
        if (svgClass) { circle.setAttribute("class", svgClass); }
        return circle;
    },

    createRectangle: function createRectangle(x, y, width, height, svgClass) {
        let rect = document.createElementNS(this.SVG_NAMESPACE, "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        if (svgClass) { rect.setAttribute("class", svgClass); }
        return rect;
    }

}
