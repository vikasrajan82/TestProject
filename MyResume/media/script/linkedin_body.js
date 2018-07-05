String.prototype.paddingLeft = function (paddingValue) {
    return String(paddingValue + this).slice(-paddingValue.length);
};

var resizeTime,
    resizeTimeout = false,
    timeDelta = 200,
    tdContentWidth,
    tdContentHeight,
    tdLeftWidth,
    tdLeftHeight,
    projContainerHeight = 500,
    projContainerWidth = 700,
    scrollBarTotalHeight,
    initialScrollPosition0,
    initialScrollPosition1,
    previousScrollPosition,
    oldContainerXPosition,
    oldContainerYPosition,
    brush,
    scrollScale,
    handle,
    map,
    svg,
    svgLeft,
    currentLoc,
    officeLoc,
    allEvents,
    bookmarkOffset = 10,
    pageNames = [
        { id: "pathInterests", label: "INTERESTS" },
        { id: "pathSkills", label: "SKILLS" },
        { id: "pathExperience", label: "EXPERIENCE" }
    ],
    xStart = 15,
    yStart = 45,
    mainPageWidth,
    mainPageHeight,
    radius = 10,
    secondRadius = radius - 5,
    pageOffset = 6,
    timelineWidth,
    timelinexStart,
    timelineyStart,
    timelineHeight = 40,
    initialDate = new Date(2004, 00, 01),
    endDate = new Date(2019, 07, 30),
    range,
    employmentDetails,
    yearScale,
    personalDetailsPositionX,
    personalDetailsPositionY,
    menuTopOffset = 7,
    menuRightOffset = 35,
    menuWidth = 45,
    nameYAxis,
    skillInnerRadius,
    skillOuterRadius,
    profileImageHeight;


var element;

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .direction("e")
    .offset([-10, 0])
    .html(function (desc) {
        return desc;

        var noOfChars = 50,
            lines = [],
            lastIndexOfDesc;

        if (desc) {
            while (desc.length != 0) {
                if (desc.length >= noOfChars) {
                    if (desc.substr(noOfChars, 1) == " ") {
                        lines.push(desc.substr(0, noOfChars));
                        desc = desc.substring(noOfChars + 1);
                    } else {
                        lastIndexOfDesc = desc.substr(0, noOfChars).lastIndexOf(" ");

                        lines.push(desc.substr(0, lastIndexOfDesc + 1));
                        desc = desc.substring(lastIndexOfDesc + 1);
                    }
                } else {
                    lines.push(desc);
                    desc = "";
                }
            }

            return lines.join("<br>");
        }

        return "";
    });


function plotBothPages() {
    tdContentWidth = document.getElementById("tdContent").clientWidth;
    tdContentHeight = document.getElementById("tdContent").clientHeight;
    tdLeftWidth = document.getElementById("tdLeftSection").clientWidth;
    tdLeftHeight = document.getElementById("tdLeftSection").clientHeight;

    element = {
        width: "100%",
        height: tdContentHeight - 4
    };

    svg = d3.select("#tdContent").append("svg")
        .attr("width", element.width)
        .attr("height", element.height)
        .append("g")
        .attr("transform", "translate(0,0)");

    svg.call(tip);

    svgLeft = d3.select("#tdLeftSection").append("svg")
        .attr("width", element.width)
        .attr("height", element.height)
        .append("g")
        .attr("transform", "translate(0,0)");

    applyBGGradient(svg);

    applyBGGradient(svgLeft);

    svg.append("linearGradient")
        .attr("id", "mainPageGradient")
        .attr("spreadMethod", "pad")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "0%")
        .selectAll("stop")
        .data([{
            offset: "0%",
            color: "rgb(244,244,244)"
        }, {
            offset: "50%",
            color: "white"
        }, {
            offset: "100%",
            color: "rgb(244,244,244)"
        }])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
            return d.offset;
        })
        .attr("stop-color", function (d) {
            return d.color;
        });

    svg.append("linearGradient")
        .attr("id", "binderGradient")
        .attr("spreadMethod", "pad")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "0%")
        .selectAll("stop")
        .data([{
            offset: "0%",
            color: "rgb(132, 133, 135)"
        }, {
            offset: "50%",
            color: "rgb(251,251,251)"
        }, {
            offset: "100%",
            color: "rgb(132, 133, 135)"
        }])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
            return d.offset;
        })
        .attr("stop-color", function (d) {
            return d.color;
        });

    svg.append("linearGradient")
        .attr("id", "timelineGradient")
        .attr("spreadMethod", "pad")
        .attr("x1", "100%").attr("y1", "100%")
        .attr("x2", "100%").attr("y2", "0%")
        .selectAll("stop")
        .data([{
            offset: "0%",
            color: "rgb(67,80,97)"
        }, {
            offset: "100%",
            color: "rgb(82,100,124)"
        }])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
            return d.offset;
        })
        .attr("stop-color", function (d) {
            return d.color;
        });


    mainPageWidth = tdContentWidth - 80;
    mainPageHeight = tdContentHeight - 77;
    timelineWidth = mainPageWidth * 0.85;
    timelinexStart = xStart + (mainPageWidth - timelineWidth) / 2;
    timelineyStart = yStart + tdContentHeight * 0.38;
    
    range = {
        lowerBound: parseFloat(timelinexStart),
        upperBound: parseFloat(timelinexStart + timelineWidth + 20)
    };
    
    yearScale = d3.time.scale().domain([initialDate, endDate]).range([range.lowerBound, range.upperBound]);

    svg.append("rect")
        .attr("x", -5)
        .attr("y", (tdContentHeight - (mainPageHeight - 100)) / 2)
        .attr("width", xStart + 5)
        .attr("height", (mainPageHeight - 100))
        .attr("fill", "url(#mainPageGradient)");

    svg.append("path")
        .attr("d", secondPageBorder(xStart + mainPageWidth + secondRadius * 2, yStart + pageOffset * 3, mainPageWidth, mainPageHeight, secondRadius))
        .attr("class", "secondBookSection");

    svg.append("path")
        .attr("d", secondPageBorder(xStart + mainPageWidth + secondRadius, yStart + pageOffset * 2, mainPageWidth, mainPageHeight, secondRadius))
        .attr("class", "secondBookSection");

    svg.append("path")
        .attr("d", secondPageBorder(xStart + mainPageWidth, yStart + pageOffset, mainPageWidth, mainPageHeight, secondRadius))
        .attr("class", "secondBookSection");

    bookmarkOffset = 20;
    var bookmarkTopWidth = 25,
        bookmarkBottomWidth = 40,
        bookmarkHeight = 200;

    // filters go in defs element
    var defs = svg.append("defs");

    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 2)
        .attr("result", "blur");

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 2)
        .attr("dy", 2)
        .attr("result", "offsetBlur");

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur");

    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    svg.append("path")
        .attr("d", bookmarkSection(xStart + mainPageWidth + secondRadius * 2 + 1, yStart + pageOffset + bookmarkOffset + bookmarkHeight * 2 - 60, bookmarkTopWidth, bookmarkBottomWidth, bookmarkHeight, secondRadius))
        .attr("fill", "rgb(150,207,68)")
        .style("filter", "url(#drop-shadow)")
        .style("cursor", "pointer")
        .attr("id", pageNames[0].id)
        .on("click", function () { pageChange(pageNames[0].id); });

    drawBookMarkText(svg, pageNames[0].label, xStart + mainPageWidth + secondRadius * 2 + 1, yStart + pageOffset + bookmarkOffset + bookmarkHeight * 2 - 60, bookmarkTopWidth, bookmarkHeight, pageNames[0].id);

    svg.append("path")
        .attr("d", bookmarkSection(xStart + mainPageWidth + secondRadius + 1, yStart + pageOffset + bookmarkOffset + bookmarkHeight, bookmarkTopWidth, bookmarkBottomWidth, bookmarkHeight - 60, secondRadius))
        .attr("fill", "rgb(243,201,41)")
        .style("filter", "url(#drop-shadow)")
        .style("cursor", "pointer")
        .attr("id", pageNames[1].id)
        .on("click", function () { pageChange(pageNames[1].id); });

    drawBookMarkText(svg, pageNames[1].label, xStart + mainPageWidth + secondRadius + 1, yStart + pageOffset + bookmarkOffset + bookmarkHeight, bookmarkTopWidth, bookmarkHeight-60, pageNames[1].id);

    svg.append("path")
        .attr("d", bookmarkSection(xStart + mainPageWidth, yStart + pageOffset + bookmarkOffset, bookmarkTopWidth, bookmarkBottomWidth, bookmarkHeight, secondRadius))
        .attr("fill", "rgb(255,92,1)")
        .style("filter", "url(#drop-shadow)")
        .style("cursor", "pointer")
        .attr("id", pageNames[2].id)
        .on("click", function () { pageChange(pageNames[2].id); });

    drawBookMarkText(svg, pageNames[2].label, xStart + mainPageWidth, yStart + pageOffset + bookmarkOffset, bookmarkTopWidth, bookmarkHeight, pageNames[2].id);

    var mainPage = svg.append("path")
        .attr("d", mainPageBorder(xStart, yStart, mainPageWidth, mainPageHeight, radius))
        .attr("class", "mainBookSection")
        .attr("fill", "url(#mainPageGradient)");

    //drawTurnLeaf(svg, xStart, yStart, mainPageWidth, mainPageHeight, radius);

    plotLeftSideOfResume(svgLeft);

    drawSummaryPage();

    console.log(mainPageHeight);

    //plotMySkillSet();

    //displayProjectDetails(svg);

    //// Draws the circles on the left/right side of the page (top section)
    for (i = 0; i < 4; i++) {
        drawCircle(svg, xStart, yStart, i, mainPageHeight, "top", "right");
        drawCircle(svgLeft, tdLeftWidth - xStart, yStart, i, mainPageHeight, "top", "left");
    }

    // Draws the circles on the left/right side of the page (bottom section)
    for (i = 0; i < 4; i++) {
        drawCircle(svg, xStart, yStart, i, mainPageHeight, "bottom", "right");
        drawCircle(svgLeft, tdLeftWidth - xStart, yStart, i, mainPageHeight, "bottom", "left");
    }
}

window.addEventListener("resize", function () {
    resizeTime = new Date();
    if (resizeTimeout === false) {
        resizeTimeout = true;
        setTimeout(resizeEnd, timeDelta);
    }
});

plotBothPages();