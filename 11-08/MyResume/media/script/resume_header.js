function mainPageBorder(x, y, width, height, radius) {
    var rightBorderTop = 100;
    var rightBorderBottom = 100;
    return "M" + (x + radius) + "," + y +
        "h" + (width - radius * 2) +
        "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius +
        "v" + (height - 2 * radius - rightBorderTop) +
        //"a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius +
        "l" + -rightBorderBottom + "," + (rightBorderTop + radius) +
        "h" + (radius - width + rightBorderBottom) +
        "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius +
        "v" + -(height - radius * 2) +
        "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius + "z";
}

function secondPageBorder(x, y, width, height, radius) {
    return "M" + x + "," + y +
        "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius +
        "v" + (height - 2 * radius) +
        "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius +
        "h" + (radius * 2 - width) +
        "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius +
        "v" + (height - 2 * radius) * -1 +
        "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius + "z";
}

function bookmarkSection(x, y, topWidth, bottomWidth, height, radius) {
    return "M" + x + "," + y +
        "h" + topWidth +
        "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius +
        "l" + (bottomWidth - topWidth) + "," + (height - 2 * radius) +
        "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius +
        "h" + (-bottomWidth) + "z";
}

function mainTimeLine(x, y, width, height, radius) {
    return "M" + x + "," + y +
        "h" + (width - radius) +
        "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius +
        "v" + (height - 2 * radius) +
        "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius +
        "h" + (radius - width) +
        "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius +
        "v" + (height - 2 * radius) * -1 +
        "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius + "z";
}

function drawCircle(svg, xStart, yStart, position, height, orientation, direction) {
    var midCoordinate = yStart + height / 2,
        binderWidth = 100,
        binderRadius = 5,
        xCircleStart = xStart + 30;
    if (direction != null && direction == "left") {
        xCircleStart = xStart - 30;
    }

    var circleRadius = 12;
    var buffer = midCoordinate;
    if (orientation === "top") {
        buffer = midCoordinate - 100 - (circleRadius + 40) * position;
    } else {
        buffer = midCoordinate + 100 + (circleRadius + 40) * position;
    }

    svg.append("circle")
        .attr("cx", xCircleStart)
        .attr("cy", buffer)
        .attr("r", circleRadius);

    if (direction != null && direction == "left") {
        svg.append("path")
            .attr("d", "M" + xCircleStart + "," + (buffer + circleRadius) +
                "a" + circleRadius + "," + circleRadius + " 0 0 0 " + circleRadius + "," + -circleRadius +
                "a" + -circleRadius + "," + -circleRadius + " 1 0 0 " + -circleRadius + "," + -circleRadius +
                "Q" + (xCircleStart + circleRadius + 2) + "," + (buffer) + " " + xCircleStart + "," + (buffer + circleRadius) + "z")
            .attr("fill", "rgb(162,162,162)");

        if (!(window.navigator.userAgent.indexOf("Trident") > -1)) {
            svg.append("path")
                .attr("d", secondPageBorder(xCircleStart + binderWidth - binderRadius * 2, buffer - binderRadius, binderWidth, 10, binderRadius))
                .attr("class", "spiralBinding")
                .attr("fill", "url(#binderGradient)");

            //svg.append("circle")
            //    .attr("cx", xCircleStart)
            //    .attr("cy", buffer+binderRadius)
            //    .attr("r", 4)
            //    .attr("fill", "red");

            //svg.append("circle")
            //    .attr("cx", xCircleStart - (binderWidth)/2)
            //    .attr("cy", buffer + binderRadius * 2)
            //    .attr("r", 4)
            //    .attr("fill", "red");

            svg.append("path")
                .attr("d", "M" + (xCircleStart) + "," + (buffer + binderRadius) +
                    "Q" + (xCircleStart + binderWidth / 2) + "," + (buffer + binderRadius * 5) + " " + (xCircleStart + binderWidth + binderRadius) + "," + (buffer + binderRadius) + "z")
                .attr("opacity", 0.3)
                .attr("fill", "black");
        }
    } else {
        svg.append("path")
            .attr("d", "M" + xCircleStart + "," + (buffer + circleRadius) +
                "a" + circleRadius + "," + circleRadius + " 0 0 1 " + -circleRadius + "," + -circleRadius +
                "a" + circleRadius + "," + circleRadius + " 0 0 1 " + circleRadius + "," + -circleRadius +
                "Q" + (xCircleStart - circleRadius - 2) + "," + (buffer) + " " + xCircleStart + "," + (buffer + circleRadius) + "z")
            .attr("fill", "rgb(162,162,162)");

        svg.append("path")
            .attr("d", secondPageBorder(xCircleStart, buffer - binderRadius, binderWidth, 10, binderRadius))
            .attr("class", "spiralBinding")
            .attr("fill", "url(#binderGradient)");

        svg.append("path")
            .attr("d", "M" + xCircleStart + "," + (buffer + binderRadius) +
                "Q" + (xCircleStart - binderWidth / 2) + "," + (buffer + binderRadius * 5) + " " + (xCircleStart - binderWidth + binderRadius) + "," + (buffer + binderRadius) + "z")
            .attr("opacity", 0.3)
            .attr("fill", "black");


    }
}

function drawEmploymentPath(startDate, endDate, yStart, radius) {
    yStart = yStart - (radius - 3);
    var slopeLength = 10,
        slopeHeight = 30,
        startDatePt = yearScale(startDate),
        endDatePt = yearScale(endDate),
        isCurrent = endDate > (new Date()).addDays(-1);

    return "M" + startDatePt + "," + yStart +
    "l" + (slopeLength) + "," + -(slopeHeight) +
    (!isCurrent ?
        "h" + (endDatePt - startDatePt - slopeLength * 2) + "l" + slopeLength + "," + slopeHeight :
        "h" + (endDatePt - startDatePt - slopeLength) + "l" + 0 + "," + slopeHeight) +
    +"z";
}

function rightRoundedRect(x, y, width, height, radius) {
    return "M" + (x + radius) + "," + y + "h" + (width - radius * 2) + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius + "v" + (height - 2 * radius) + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius + "h" + (radius * 2 - width) + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius + "v" + (2 * radius - height) + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius + "z";
}

function removePersonalEvents(svg) {
    var exitDuration = 450;

    svg.selectAll("line.eventPath").transition().duration(exitDuration).style("opacity", 0).remove();
    svg.selectAll("image.flagImage").transition().duration(exitDuration).style("opacity", 0).remove();
    svg.selectAll("text.checkptHeader").transition().duration(exitDuration).style("opacity", 0).remove();
}

function expandCollapseDiv(obj) {
    if (obj.parentElement.getElementsByTagName("div") && obj.parentElement.getElementsByTagName("div").length > 0) {
        var containerDiv = obj.parentElement.getElementsByTagName("div")[0];

        if (containerDiv.style.display && containerDiv.style.display == "none") {
            containerDiv.style.display = "block";
            obj.src = "media/img/collapse.png";
            //obj.style = "height: 4px;width: 12px;";
        } else {
            containerDiv.style.display = "none";
            obj.src = "media/img/expand.png";
            //obj.style = "height: 12px;width: 4px;";
        }
    }
}

function showPersonalDetailsOption(svg) {
    var boxPosition = yearScale(new Date(2017, 02, 25)),
        perCont = svg.append("g")
        .attr("transform", "translate(" + boxPosition + ",100)");

    svg.append("g")
        .attr("transform", "translate(" + (boxPosition - 10) + ",115)")
        //.append("rect")
        ////.attr("x", 0)
        ////.attr("y", 0)
        //.attr("height", 120)
        //.attr("width", 120)
        //.attr("fill", "red");
        .append("text")
        .attr("text-anchor", "end")
        .attr("class", "personalLabel")
        //.attr("transform", 'translate(0,0)')
        .text("Show Personal Events");

    var containerWidth = 80;
    var buttonWidth = 36;

    perCont.append("path")
        .attr("d", rightRoundedRect(0, 0, containerWidth, 20, 3))
        .attr("stroke-width", 0.5)
        .attr("fill", "gray");

    perCont.append("text")
        .attr("text-anchor", "start")
        .attr("class", "onOffLabel")
        .attr('transform', 'translate(' + 10 + ',' + 14 + ')')
        .text("ON");

    perCont.append("text")
        .attr("text-anchor", "start")
        .attr("class", "onOffLabel")
        .attr('transform', 'translate(' + (containerWidth / 2 + 6) + ',' + 14 + ')')
        .text("OFF");

    perCont.append("path")
        .attr("d", rightRoundedRect((containerWidth / 2 + 1), 2, buttonWidth, 16, 3))
        .attr("stroke", "green")
        .attr("stroke-width", 0.5)
        .attr("fill", "rgb(89,185,0)")
        .style("cursor", "pointer")
        .attr("opacity", 0)
        .attr("id", "offPath")
        .on('click', function () {
            if (d3.select(this).attr("opacity") === "0") {
                logTrace("Plotting my personal details.");
                plotPersonalEvents(svg, timelineyStart);
                d3.select(this).attr("opacity", 1);
                d3.select("#OnPath").attr("opacity", 0);
                d3.select(this).style("cursor", "pointer");
            } else {
                d3.select(this).style("cursor", "default");
            }
        });

    perCont.append("path")
        .attr("d", rightRoundedRect(3, 2, buttonWidth, 16, 3))
        .attr("stroke", "green")
        .attr("stroke-width", 0.5)
        .attr("fill", "rgb(209,1,0)")
        .style("cursor", "default")
        .attr("opacity", 1)
        .attr("id", "OnPath")
        .on('click', function () {
            if (d3.select(this).attr("opacity") === "0") {
                removePersonalEvents(svg);
                d3.select(this).attr("opacity", 1);
                d3.select("#offPath").attr("opacity", 0);
                d3.select(this).style("cursor", "pointer");
            } else {
                d3.select(this).style("cursor", "default");
            }
        });
}

function removeProjectDetails() {
    d3.selectAll("#projDetailsContainer").remove();
    d3.selectAll("#projBackGroundContainer").remove();
}

function displayProjectDetails(svg) {
    var backgroundContainer = svg.append("path")
        .attr("d", mainPageBorder(xStart, yStart, mainPageWidth, mainPageHeight, radius))
        .attr("id", "projBackGroundContainer")
        .attr("fill", "green")
        .attr("opacity", "0.1")
        .on("click", function () {
            removeProjectDetails();
        });

    var mainclipContainer = svg.append("svg:defs").append("svg:clipPath")
        .attr("id", "mainClip")
        .append("rect")
        .attr("id", "mainContainerBlock")
        .attr('width', 1100)
        .attr('height', 400)
        .attr('x', 0)
        .attr('y', 0)
        .attr("fill", "red");

    var projectDetails = svg.append("g")
        .attr("id", "projDetailsContainer")
        .attr("transform", "translate(" + (tdContentWidth - projContainerWidth) / 2 + "," + (tdContentHeight - projContainerHeight) / 2 + ")");

    projectDetails.append("path")
        .attr("d", rightRoundedRect(0, 0, projContainerWidth, projContainerHeight, 3))
        .attr("stroke-width", 0.5)
        .style("opacity", "0.98 ")
        .attr("stroke", "gray")
        .attr("fill", "white");


    var allHeaders = [{
        title: "Project:",
        Desc: "TraCE CRM Upgrade from CRM 2011 to CRM 2015"
    }, {
        title: "Client:",
        Desc: "WIPRO, INDIA"
    }, {
        title: "Duration:",
        Desc: "Nov 2014 till March 2015"
    }, {
        title: "Technology:",
        Desc: "Dynamics CRM 2013/2015, HTML, Javascript, Web API"
    }, {
        title: "Company:",
        Desc: "Microsoft Global Services India (MGSI)"
    }, {
        title: "Description:",
        Desc: "The Wipro team was planning to upgrade their existing CRM system from 2011 to 2015. As part of their upgrade they wanted to develop a custom integration between CRM and other external applications. These included: <br><bullet><h>{113}CRM – Yammer: </h>CRM Supports OOB integration with Yammer. All conversations created from CRM are posted to the same group in Yammer. Wipro had a custom requirement to have a group created for each record within CRM. This would ensure that only a specified set of users is granted access to the group. There was also integration built to add users to the Yammer Group directly from CRM.</bullet><br><br><bullet><h>{125}CRM – Office 365: </h>The requirement was to build a global calendar to display the appointments from CRM and Office 365. This provided users with a consolidated view of all the activities assigned to them which could be either in CRM or in Office 365. The integration was built using the Exchange Web Service API to retrieve the appointment details.</bullet><br><br><bullet><h>{130}CRM – SharePoint: </h>The scope of this requirement was to restrict access to the SharePoint folder based on the security permissions of the entity record within CRM.</bullet><br>"
    }],
        bufferHeight = 40,
        intervalHeight = 30,
        leftBuffer = 20;

    projectDetails.selectAll("text.projHeaders")
        .data(allHeaders)
        .enter()
        .append("text")
        .attr("text-anchor", "start")
        .attr('transform', function (d, i) {
            return 'translate(' + leftBuffer + "," + (bufferHeight + intervalHeight * i) + ')';
        })
        .attr("class", "projHeaders")
        .attr("fill", "black")
        .text(function (d, i) {
            wrapDescription(projectDetails, (leftBuffer + 120), (bufferHeight + intervalHeight * i), d.Desc);
            return d.title;
        });
}

function wrapDescription(containerSvg, xAxis, yAxis, descText) {
    var actualNoOfChars = 80,
        noOfChars = 80,
        lines = [],
        lineSeparatorHeight = 20,
        lastIndexOfDesc,
        desc,
        bulletHeader,
        headerLength = -1,
        tabOffset = 40,
        isBulletPoint = false,
        descs = descText.split("<br>");

    for (iCount = 0; iCount < descs.length; iCount++) {

        desc = descs[iCount].replace("<br>", "");
        bulletHeader = "";
        isBulletPoint = false;

        if (desc.indexOf("<bullet>") > -1) {
            isBulletPoint = true;
            desc = desc.replace("<bullet>", "").replace("</bullet>", "");
            if (desc.indexOf("<h>") > -1) {
                bulletHeader = desc.substring(desc.indexOf("<h>") + 3, desc.indexOf("</h>"));
                if (bulletHeader.indexOf("{") > -1) {
                    headerLength = parseInt(bulletHeader.substring(bulletHeader.indexOf("{") + 1, bulletHeader.indexOf("}")));
                    bulletHeader = bulletHeader.substr(bulletHeader.indexOf("}") + 1);
                }
                desc = desc.substr(desc.indexOf("</h>") + 4);
            }
        }

        if (isBulletPoint) {
            if (bulletHeader == "") {
                noOfChars = actualNoOfChars - tabOffset / 8.5;
            } else {
                noOfChars = actualNoOfChars - bulletHeader.length - 5 - tabOffset / 8.5;
            }
        } else {
            noOfChars = actualNoOfChars
        }

        if (desc.length == 0) {
            lines.push({
                text: "",
                isBullet: false,
                header: "",
                bulletLength: 0
            });
        }

        while (desc.length != 0) {
            if (desc.length >= noOfChars) {
                if (desc.substr(noOfChars, 1) == " ") {
                    lines.push({
                        text: desc.substr(0, noOfChars),
                        isBullet: isBulletPoint,
                        header: bulletHeader,
                        bulletLength: headerLength
                    });
                    desc = desc.substring(noOfChars + 1);
                } else {
                    lastIndexOfDesc = desc.substr(0, noOfChars).lastIndexOf(" ");

                    lines.push({
                        text: desc.substr(0, lastIndexOfDesc + 1),
                        isBullet: isBulletPoint,
                        header: bulletHeader,
                        bulletLength: headerLength
                    });
                    desc = desc.substring(lastIndexOfDesc + 1);
                }
            } else {
                lines.push({
                    text: desc,
                    isBullet: isBulletPoint,
                    header: bulletHeader,
                    bulletLength: headerLength
                });
                desc = "";
            }

            if (isBulletPoint && bulletHeader != "") {
                bulletHeader = "";
                noOfChars = actualNoOfChars - tabOffset / 8.5;
            }
        }
    }

    if (lines.length <= 1) {
        containerSvg.append("g")
            .append("text")
            .attr("text-anchor", "start")
            .attr("transform", "translate(" + xAxis + "," + yAxis + ")")
            .text(lines.length == 0 ? "" : lines[0].text)
            .attr("class", "projDesc")
            .attr("fill", "gray");
    } else {

        var txtContainerSvg = containerSvg.append("g")
            .attr("clip-path", function (d, i) {
                return "url(#mainClip)";
            });

        var txtContainer = txtContainerSvg
            .append("text")
            .attr("id", "projDescription")
            .attr("text-anchor", "start")
            .attr("transform", "translate(" + xAxis + "," + yAxis + ")");


        txtContainer.selectAll("tspan")
            .data(lines)
            .enter()
            .append("tspan")
            .attr("x", function (d) {
                if (d.header == "") {
                    if (!d.isBullet) {
                        return 0;
                    } else {
                        return tabOffset;
                    }
                } else {
                    return tabOffset + d.bulletLength;
                }
            })
            .attr("y", function (d, iPos) {
                return 20 * iPos;
            })
            .text(function (d, iPos) {
                if (d.header != "") {
                    //alert("in");
                    txtContainer
                        .append("tspan")
                        .attr("x", tabOffset)
                        .attr("y", lineSeparatorHeight * iPos)
                        .attr("class", "projDesc")
                        .attr("fill", "black")
                        .style("font-weight", "bold")
                        .text(d.header);
                }

                return d.text;
            })
            .attr("class", "projDesc")
            .attr("fill", "gray");

        // alert(txtContainer.node().getBBox().width);

        var sliderSvg = txtContainerSvg.append("g")
            .attr("transform", "translate(" + (xAxis + txtContainer.node().getBBox().width + 20) + "," + (yAxis - 10) + ") rotate(90)");

        //Slider Section
        scrollBarTotalHeight = projContainerHeight - yAxis - 30;
        scrollScale = d3.scale.linear()
            .domain([0, lines.length * lineSeparatorHeight])
            .range([0, scrollBarTotalHeight]);

        var containerScale = d3.scale.linear()
            .domain([0, txtContainer.node().getBBox().height + lineSeparatorHeight])
            .range([0, scrollBarTotalHeight]);
        //alert(containerScale(projContainerHeight - yAxis - 30));

        d3.select("#mainContainerBlock")
            .attr('x', xAxis)
            .attr('y', yAxis - 10)
            .attr("width", projContainerWidth - 20)
            .attr("height", (projContainerHeight - yAxis - 21));

        brush = d3.svg.brush()
            .x(scrollScale)
            .extent([0, 0])
            .on("brush", brushended);
        //.on("brushend", brushended);

        var gBrush = sliderSvg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(5,0)")
            .call(d3.svg.axis()
                .scale(scrollScale)
                .tickFormat("")
                .tickSize(0)
                .tickPadding(12))
            .select(".domain")
            .select(function () {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "halo");

        var slider = sliderSvg.append("g")
            .attr("class", "slider")
            .call(brush);

        slider.selectAll(".extent,.resize")
            .remove();

        var sliderHeight = 7;
        slider.select(".background")
            .style("cursor", "default")
            .attr("y", 0)
            .attr("height", sliderHeight * 2);

        handle = slider.append("rect")
            .attr("class", "handle")
            .attr("transform", "translate(5,-3.5)")
            .attr("parentId", "projDescription")
            .attr("width", containerScale(projContainerHeight - yAxis - 30))
            .attr("height", sliderHeight);

        //slider
        //    .call(brush.event)
        //    .transition() // gratuitous intro!
        //    .duration(750)
        //    .call(brush.extent([70, 70]))
        //    .call(brush.event);

        //gBrush.selectAll("rect")
        //    .attr("height", 15);
    }
}

function brushended() {

    var value = brush.extent()[0],
        extentValues = brush.extent(),
        valueDiff = scrollScale(extentValues[1]) - scrollScale(extentValues[0]);

    if (initialScrollPosition0 != extentValues[0] && initialScrollPosition1 != extentValues[1]) {
        initialScrollPosition0 = extentValues[0];
        initialScrollPosition1 = extentValues[1];
        previousScrollPosition = handle.node().getBBox().x;
    } else {
        if (initialScrollPosition0 != extentValues[0]) {
            valueDiff = valueDiff * -1;
        }
    }

    if (d3.event.sourceEvent) { // not a programmatic event
        value = scrollScale.invert(d3.mouse(this)[0]);
    }

    var newXPosition = 0;
    if (scrollBarTotalHeight >= (previousScrollPosition + valueDiff + handle.node().getBBox().width)) {
        if (previousScrollPosition + valueDiff <= 0) {
            newXPosition = 0;
            handle.attr("x", 0);
        } else {
            newXPosition = previousScrollPosition + valueDiff;
            handle.attr("x", previousScrollPosition + valueDiff);
        }
    } else {
        newXPosition = scrollBarTotalHeight - handle.node().getBBox().width;
        handle.attr("x", scrollBarTotalHeight - handle.node().getBBox().width);
    }

    handle.attr("x", newXPosition);

    if (oldContainerXPosition === undefined || oldContainerXPosition === null) {
        var transformAttr = d3.select("#" + handle.attr("parentId")).attr("transform").replace("translate(", "").replace(")");
        oldContainerXPosition = parseInt(transformAttr.split(" ")[0]);
        oldContainerYPosition = parseInt(transformAttr.split(" ")[1]);
    }

    d3.select("#" + handle.attr("parentId")).attr("transform", "translate(" + oldContainerXPosition + "," + (oldContainerYPosition - newXPosition) + " )");
}

function plotTotalWorkExperience(svg, startDate, cy) {
    var expStart = yearScale(startDate),
        expEnd = yearScale(new Date()),
        expBarWidth = 20,
        totalExp = svg.append("g")
        .attr("transform", "translate(" + expStart + "," + cy + ")");

    totalExp.append("path")
        .attr("d", mainTimeLine((((expEnd - expStart) / 2) - ((expEnd - expStart) / 8)), 0, (expEnd - expStart) / 4, 0, 0))
        .attr("fill", "rgb(138,199,196)")
        .transition()
        .duration(1000)
        .delay(4000)
        .attr("d", mainTimeLine(0, 0, expEnd - expStart, expBarWidth, expBarWidth / 2));

    totalExp.append("text")
        .attr("text-anchor", "middle")
        .attr('transform', 'translate(' + (expEnd - expStart) / 2 + ', ' + (expBarWidth / 2 + 4) + ')')
        .attr("class", "expLabel")
        .attr("fill", "rgb(67, 67, 67)")
        .transition()
        .duration(500)
        .delay(5000)
        .text("Total Experience: 12 Years");
}

function plotOtherAchievements(svg, cy) {
    var xStart = yearScale(new Date(2014, 08, 01)),
        yStart = cy + 50;

    svg.append("line")
        .attr("x1", xStart)
        .attr("y1", cy)
        .attr("x2", xStart)
        .attr("y2", cy)
        //.attr("x2", yearScale(new Date(2014, 08, 01)))
        //.attr("y2", yStart)
        .style("stroke-dasharray", ("1, 1"))
        .attr("stroke", "black")
        .transition()
        .duration(500)
        .delay(3000)
        .attr("x2", yearScale(new Date(2014, 08, 01)))
        .attr("y2", yStart);

    svg.append("circle")
        .attr("cx", xStart)
        .attr("cy", cy)
        .attr("r", 0)
        .attr("fill", "rgb(233,209,179)")
        .transition()
        .duration(300)
        .delay(3000)
        .attr("r", 5);

    svg.append("circle")
        .attr("cx", xStart)
        .attr("cy", yStart)
        .attr("r", 0)
        .attr("fill", "black")
        .transition()
        .duration(300)
        .delay(3300)
        .attr("r", 2);

    var hackathonDesc = "Participated in the Hackathon Event to create \"Lync Extension For Dynamics CRM\"";

    var splitTexts = splitSentencestoSmallerStings(hackathonDesc, 35);

    if (splitTexts) {
        splitTexts.forEach(function (item, index) {
            svg.append("text")
                .attr("text-anchor", "middle")
                .attr('transform', 'translate(' + xStart + ', ' + (yStart + 20 + index * 15) + ')')
                .attr("class", "otherAchievementLabel")
                .attr("alt", "Click here for the submission video")
                .on("click", function () {
                    d3.select("#divHackathonEvents").remove();

                    displayOverlay();

                    var mapExpandedWidth = 0.7 * document.body.clientWidth - 10,
                        mapExpandedHeight = 0.7 * document.body.clientHeight - 20,
                        divContainer = d3.select("body")
                        .append("div")
                        .attr("class", "videoContainerSection")
                        .attr("id", "divHackathonEvents")
                        .style("top", (document.body.clientHeight - mapExpandedHeight - 50) / 2 + "px")
                        .style("left", (document.body.clientWidth - mapExpandedWidth - 40) / 2 + "px")
                        .style("width", (mapExpandedWidth) + "px")
                        .style("height", (mapExpandedHeight) + "px")
                        .style("padding", "0px");

                    divContainer.append("div")
                        .attr("class", "videoContainerHeader");

                    divContainer.append("img")
                        .attr("class", "videoContainerImg")
                        .attr("src", "./media/img/close.png")
                        .attr("title", "Close")
                        .on("click", function () {
                            hideOverlay();
                            d3.select("#divHackathonEvents").remove();
                        });

                    var divContent = divContainer.append("div")
                        .attr("class", "videoContent")
                        .style("height", (mapExpandedHeight - 30 - 10 * 2) + "px");

                    var tableRow = divContent.append("table")
                        .style("height", "100%")
                        .style("width", "100%")
                        .append("tr");

                    tableRow.append("td")
                        .style("width", "65%")
                        .style("padding-top", "0px")
                        .attr("valign", "top")
                        .append("video")
                        .style("width", "100%")
                        .style("height", (mapExpandedHeight - 60 - 20 * 2) + "px")
                        .attr("controls", "true")
                        .append("source")
                        .attr("src", "media/video/lyncextension.mp4");

                    var hackathonDesc = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font class='hackLabel'>Dynamics CRM has always provided great extensibility features. Several desktop applications have been built to interact with it. The most notable being the outlook client. The idea here is to build a similar Lync Client for CRM. Lync is mainly used for communication in most organization around the world. The Lync Add-in for CRM would be a value add for customers who tend to have both of these Microsoft product; Lync & Dynamics CRM 2013. Based on the feedback from different customers, it has been observed that most contacts within CRM are also present as users within Lync. And lot of business meetings/conversations happen via Lync. Hence, integrating the Lync client with CRM will enable them to easily record all these interactions as activities within CRM. The Lync Add-in will be a one-time installation that has to be performed on the client machine. <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This was submitted as part of the Hackathon event conducted in the year 2014. The project details are available at the hackathon site <a href='https://onehack.azurewebsites.net/project/495693c9-cb11-e411-903f-00155d5066d7' target='_blank'>here</a>.</font>";

                    tableRow.append("td")
                        .style("padding-top", "25px")
                        .style("padding-left", "18px")
                        .style("padding-right", "10px")
                        .attr("valign", "top")
                        .html(hackathonDesc);
                })
                .transition()
                .delay(3600)
                .text(item);
        });
    }

}

function splitSentencestoSmallerStings(sentence, partLength) {
    var words = sentence.split(" ");
    var parts = new Array();
    var part = "";
    words.forEach(function (item) {
        if (part.length + item.length < partLength) {
            part += part.length < 1 ? item : " " + item;
        } else {
            parts.push(part);
            part = item;
        }
    });

    if (part) {
        parts.push(part);
    }

    return parts;
}


function plotOnsiteTravelDetails(svg, cy) {
    var endPathPoint = (yearScale(new Date(2012, 05, 12)) - yearScale(new Date(2009, 05, 30))) / 2,
        pathRouteFirstHalf = [{
            x: 0,
            y: 0
        }, {
            x: 2,
            y: 10
        }, {
            x: 15,
            y: 15
        }, {
            x: endPathPoint - 7,
            y: 16
        }, {
            x: endPathPoint,
            y: 24
        }],
        pathRouteSecondHalf = [
            {
                x: endPathPoint * 2,
                y: 0
            },
            {
                x: endPathPoint * 2 - 2,
                y: 10
            },
            {
                x: endPathPoint * 2 - 15,
                y: 15
            },
            {
                x: endPathPoint + 7,
                y: 16
            },
            {
                x: endPathPoint,
                y: 24
            }],
        elementColor = "steelblue";

    var d3line2 = d3.svg.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        })
        .interpolate("basis");

    var arrowGrp = svg.append("g")
        .attr("transform", "translate(" + yearScale(new Date(2009, 05, 30)) + "," + cy + ")");

    //arrowGrp.append("path")
    //    //.attr("d", d3line2(pathRouteFirstHalf))
    //    .attr("d", d3line2([{ x: 0, y: 0 }]))
    //    .style("stroke-width", 2)
    //    .style("stroke", elementColor)
    //    .attr("fill", "none")
    //    .transition()
    //    .duration(1000)
    //    .delay(1000)
    //    .attr("d", d3line2(pathRouteFirstHalf));

    arrowGrp.append("path")
        //.attr("d", d3line2(pathRouteFirstHalf))
        .attr("d", d3line2(pathRouteFirstHalf))
        .style("stroke-width", 0)
        .style("stroke", elementColor)
        .attr("fill", "none")
        .transition()
        .duration(1000)
        .delay(1500)
        .style("stroke-width", 2)
        .attrTween("stroke-dasharray", function () {
            var len = this.getTotalLength();
            return function (t) { return (d3.interpolateString("0," + len, len + ",0"))(t) };
        });

    //arrowGrp.append('path')
    //.attr("d", d3line2(pathRouteFirstHalf))
    //.attr("stroke", "red")
    //.attr("stroke-width", 1)
    //.attr("fill", "none")
    //.transition()
    //    .duration(2000)
    //    .attrTween("stroke-dasharray", function() {
    //        var len = this.getTotalLength();
    //        return function(t) { return (d3.interpolateString("0," + len, len + ",0"))(t) };
    //    });

    arrowGrp.append("path")
        .attr("d", d3line2(pathRouteSecondHalf))
        .style("stroke-width", 0)
        .style("stroke", elementColor)
        .attr("fill", "none")
        .transition()
        .duration(1000)
        .delay(1500)
        .style("stroke-width", 2)
        .attrTween("stroke-dasharray", function () {
            var len = this.getTotalLength();
            return function (t) { return (d3.interpolateString("0," + len, len + ",0"))(t) };
        });

    arrowGrp.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("fill", elementColor)
        .attr("r", 0)
        .transition()
        .duration(300)
        .delay(1200)
        .attr("r", 4);

    arrowGrp.append("circle")
        .attr("cx", endPathPoint * 2)
        .attr("cy", 0)
        .attr("fill", elementColor)
        .attr("r", 0)
        .transition()
        .duration(300)
        .delay(1200)
        .attr("r", 4);

    // added to two text tags for bringing it in multiple lines.
    var yPosition = 41;

    arrowGrp.append("text")
        .attr("text-anchor", "middle")
        .attr('transform', 'translate(' + endPathPoint + ', ' + yPosition + ')')
        .attr("class", "relocationLabel")
        .attr("fill", elementColor)
        .transition()
        .delay(2500)
        .text("Relocated to Florida, US");

    arrowGrp.append("text")
        .attr("text-anchor", "middle")
        .attr('transform', 'translate(' + endPathPoint + ', ' + (yPosition + 17) + ')')
        .attr("class", "relocationLabel")
        .attr("fill", elementColor)
        .transition()
        .delay(2500)
        .text("for a period of 3 years");
}

function plotPersonalEvents(svg, cy) {
    var eventHeight = 250,
        tranistionTime = 750;
    var participantEvents = [{
        date: new Date(2004, 06, 12),
        desc: "GRADUATED FROM COLLEGE",
        heightBuffer: -80,
        splitLine: false,
        splitStart: 0,
        splitEnd: 0
    }, {
        date: new Date(2011, 05, 18),
        desc: "GOT MARRIED!!",
        heightBuffer: -30,
        splitLine: true,
        splitStart: 150,
        splitEnd: 170
    }, {
        date: new Date(2013, 09, 27),
        desc: "IT'S A BOY",
        heightBuffer: -80,
        splitLine: true,
        splitStart: 65,
        splitEnd: 115
    }]

    svg.selectAll("line.eventPath")
        .data(participantEvents)
        .enter()
        .append("line")
        .attr("x1", function (d, i) {
            var xAxis = yearScale(d.date);
            d3.select(this).attr("x2", xAxis);

            return xAxis;
        })
        .attr("y1", cy)
        .attr("y2", cy)
        .attr("class", "eventPath")
        .transition()
        .duration(function (d) {
            if (!d.splitLine) {
                return tranistionTime;
            } else {
                return tranistionTime / eventHeight * d.splitStart;
            }
        })
        .attr("y2", function (d) {
            if (!d.splitLine) {
                return cy - (eventHeight + d.heightBuffer);
            } else {
                svg.append("line")
                    .attr("x1", d3.select(this).attr("x1"))
                    .attr("x2", d3.select(this).attr("x1"))
                    .attr("y1", cy - d.splitEnd)
                    .attr("y2", cy - d.splitEnd)
                    .attr("class", "eventPath")
                    .transition()
                    .delay(tranistionTime / eventHeight * d.splitEnd)
                    .duration(tranistionTime / eventHeight * (eventHeight - d.splitStart))
                    .attr("y2", cy - (eventHeight + d.heightBuffer))
                    .each("end", function () {
                        var xAxis = yearScale(d.date);

                        svg.append("svg:image")
                            .attr('x', xAxis + 1)
                            .attr('y', cy - (eventHeight + d.heightBuffer))
                            .attr('width', 14)
                            .attr('height', 14)
                            .attr("xlink:href", "flag.jpg")
                            .attr("class", "flagImage");

                        svg.append("text")
                            .attr("text-anchor", "left")
                            .attr('transform', 'translate(' + (xAxis + 20) + ', ' + (cy - (eventHeight + d.heightBuffer) + 12) + ')')
                            .attr("class", "checkptHeader")
                            .text(d.desc);
                    });

                return cy - d.splitStart;
            }
        })
        .each("end", function (d) {
            if (!d.splitLine) {
                var xAxis = yearScale(d.date);
                svg.append("svg:image")
                    .attr('x', xAxis + 1)
                    .attr('y', cy - (eventHeight + d.heightBuffer))
                    .attr('width', 14)
                    .attr('height', 14)
                    .attr("xlink:href", "flag.jpg")
                    .attr("class", "flagImage");

                svg.append("text")
                    .attr("text-anchor", "left")
                    .attr('transform', 'translate(' + (xAxis + 20) + ', ' + (cy - (eventHeight + d.heightBuffer) + 12) + ')')
                    .attr("class", "checkptHeader")
                    .text(d.desc);
            }
        })
        .ease("linear");
}

function displayOverlay() {
    d3.select("body")
        .append("div")
        .attr("class", "overlaySection")
        .attr("id", "divOverlay");
}

function hideOverlay() {
    d3.select("#divOverlay").remove();
}

function drawEmploymentArea(svg, cy) {

    var employmentDetails = [{
        start: new Date(2004, 09, 23),
        end: new Date(2007, 09, 31),
        color: "rgb(151,188,215)",
        titleBuffer: -45,
        companyName: "INFOSYS TECHNOLOGIES.",
        jobTitle: "SR. SOFTWARE ENGG",
        jobLocation: "Mysore, KA, India",
        location: "Mysore, Karnataka, India",
        responsibilities: ["Design and Development on ASP.NET, C#", "Developing Reusable Javascript Components eg: Nested Grid", "Development of SSIS Packages", "Code Review of C# modules", "Effort Estimation", "Acting as a Team Lead", "Requirement Gathering", "Functional Design Document and Technical Design Preparation"],
        projects: [{
            name: "Goldmine Business Intelligence Tool",
            client: "CITIBANK, USA",
            duration: "Feb 2006 - Oct 2007",
            technology: "FRONT-END: ASP.NET 1.1 (LANGUAGE C#)<br>BACK-END   : SQL SERVER 2000<br>OPERATING SYSTEM: WINDOWS SERVER 2003",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The purpose of this project was to create a Business intelligence tool which encompasses the whole range of business activities, including sales data, consumer patterns, and enterprise customer’s data for Verizon. The portal provides information from Billing Telephone Number Level to Corporate number level. The project included creation of web-based reports to display the customer and product information in a readable format. The user also had the option to download the data into excel or text in every page."

        }, {
            name: "Redirection of Billing data and service order from Verizon to FMI (Frequency Marketing Inc)",
            client: "Frequency Marketing Inc, USA",
            duration: "Aug 2005 - Jan 2006",
            technology: "SQL SERVER, DTS Packages<br>OPERATING SYSTEM: WINDOWS Server 2003",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The purpose of this project was to create a Business intelligence tool which encompasses the whole range of business activities, including sales data, consumer patterns, and enterprise customer’s data for Verizon. The portal provides information from Billing Telephone Number Level to Corporate number level. The project included creation of web-based reports to display the customer and product information in a readable format. The user also had the option to download the data into excel or text in every page."
        }, {
            name: "Portal Development for Project Management System",
            client: "Internal Project",
            duration: "Feb 2005 – Aug 2005",
            technology: "FRONT-END: ASP.NET (LANGUAGE C#), Active Directory<br>BACK-END   : SQL SERVER 2000<br>OPERATING SYSTEM: WINDOWS SERVER 2003",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Project Management System (PMS) is a portal which the Project Managers use to get a real-time status of the projects, members in the project, LAN Usage, etc. This portal is used by the local CCD and PLs collectively. The PL while initiating a project has to fill a form in PMS providing the software and hardware required for the project. CCD then has the right to approve or reject his requirements depending on certain criterion. The CCD also has the privilege to monitor the real time status of the LAN Space usage."
        }, {
            name: "Portal Development for Video Conferencing Management",
            client: "Internal Project",
            duration: "May 2005 – Nov 2005",
            technology: "FRONT-END: ASP.NET (LANGUAGE C#), Active Directory<br>BACK-END   : SQL SERVER 2000<br>OPERATING SYSTEM: WINDOWS SERVER 2003",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The project was an initiative taken by the local CCD to automate the Video Conference booking system. The online booking system enabled the users to reserve rooms from their desktop. It also alerted the user in the event of a time clash with other users.  The CCD is updated about the internal activities by regular mails dispatched by the application."
        }],
        skills: [{
            name: "C#",
            percentage: 70
        }, {
            name: "ASP.NET",
            percentage: 60
        }, {
            name: "Javascript",
            percentage: 50
        }, {
            name: "SQL Server 2005",
            percentage: 40
        }, {
            name: "HTML",
            percentage: 40
        }],
        id: "InfyWork"
    }, {
        start: new Date(2007, 10, 05),
        end: new Date(2013, 00, 31),
        color: "rgb(211,182,154)",
        titleBuffer: 10,
        companyName: "ORACLE FINANCIAL SERVICES SOFTWARE.",
        jobTitle: "ASSOCIATE CONSULTANT",
        jobLocation: "Mumbai, MH, India",
        location: "Mumbai, Maharashtra, India",
        responsibilities: ["Business Requirement Analysis", "Functional Specification preparation", "Framework design and implementation", "Delivery and Team Management", "Code and FRD review", "Co-ordinating with client team for requirement gathering", "Effort Estimation", "Production Support", "Code Delivery and Quality check"],
        projects: [{
            name: "Suspicious Activity Report (SAR)",
            client: "CITIBANK, USA",
            duration: "May 2009 - Oct 2012",
            technology: "FRONT-END: ASP.NET 3.5 (LANGUAGE C#)<br>BACK-END   : ORACLE 11G<br>OPERATING SYSTEM: WINDOWS SERVER 2003",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is a Citi Intranet application that is used by the Global Compliance team to report known or suspected violations of law or suspicious activity observed by financial institutions subject to the regulations of the Bank Secrecy Act (BSA. All financial institutions in US are directed to create and file SARs to FinCEN within a 30-day time period from the day the activity has occurred. This application allows the creation of Banking and Brokerage SARs. Based on the entitlements provided in the system, users are allowed to create, approve or file SARs. The SARs that are filed have to be first approved by authorized personals to ensure that the information presented in the form is accurate and have passed several levels of review. A separate team handles the filing of Banking and Brokerage SAR to FinCEN."

        }, {
            name: "Patriot Act Database",
            client: "CITIBANK, USA",
            duration: "May 2009 - Oct 2012",
            technology: "FRONT-END: ASP.NET 3.5 (LANGUAGE C#)<br>BACK-END   : ORACLE 11G<br>OPERATING SYSTEM: WINDOWS SERVER 2003",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Patriot application facilitates users to gather and disseminate foreign bank certification information among the various business segments within Citigroup. Data classification for this application is “Internal”. Users can search for certificates for various banks based on their status and certificate number."
        }, {
            name: "CATALYST",
            client: "CITIBANK, USA",
            duration: "May 2008 – May 2009",
            technology: "FRONT-END: ASP.NET 2.0 (LANGUAGE VB.NET)<br>BACK-END   : SQL SERVER 2005<br>OPERATING SYSTEM: WINDOWS SERVER 2003",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Catalyst is an application designed to assess the operational risks prevalent in banking domains. The goal of Catalyst is to provide a globally consistent and locally effective Risk Control Self Assessment (RCSA) platform that shall improve the reliability, efficiency and consistency of the RCSA process across Citigroup.  Catalyst will be the only RCSA data capture and reporting solution replacing both existing tools and spreadsheets currently in use in various areas of Citigroup."
        }, {
            name: "SMART (System For Management Activity Reporting AND Tracking) & MONiTOR",
            client: "CITIBANK, USA",
            duration: "Dec 2007 – May 2009",
            technology: "FRONT-END: ASP.NET 1.1 (LANGUAGE VB.NET)<br>BACK-END   : SQL SERVER 2000<br>OPERATING SYSTEM: WINDOWS SERVER 2003",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The purpose of the proposed application is to automate the Compliance event tracking and report generation process. Compliance event(s) data will be accessed by anyone at Citigroup who has access to the application. Application users will be allowed to generate real-time reports. These compliance activities & events are tracked and referenced by compliance officers as and when needed. The Compliance officers and heads at various levels (country, regional or sector) are able to log into the system and enter the activities & events into the system. Authorized full time Citigroup employees are granted access to the application, based on role and responsibilities, to enter real-time activities & events and generate reports."
        }],
        skills: [{
            name: "C#",
            percentage: 80
        }, {
            name: "ASP.NET",
            percentage: 80
        }, {
            name: "Javascript",
            percentage: 70
        }, {
            name: "Oracle 11G",
            percentage: 40
        }, {
            name: "Client-Side Development",
            percentage: 60
        }],
        id: "OracleWork"
    }, {
        start: new Date(2013, 01, 11),
        end: new Date(),
        color: "rgb(171,196,161)",
        titleBuffer: -45,
        companyName: "MICROSOFT SERVICES (INDIA).",
        jobTitle: "CONSULTANT",
        jobLocation: "Bengluru, KA, India",
        location: "Bengluru, Karnataka, India",
        responsibilities: ["Design and development of Object-Oriented Programming", "Business Requirement Analysis", "Framework design and implementation", "Delivery and Team Management", "Code review", "Co-ordinating with client team for requirement gathering", "Effort Estimation", "Code Delivery and Quality check"],
        projects: [{
            name: "TEXAS – WIC (Women, Infant & Children) Program",
            client: "TEXAS Government (Healthcare), USA",
            duration: "May 2015 - Present",
            technology: "Dynamics CRM 2016 Update 1, C#, WebApi, JQuery, D3.js, <br>Azure Services (Scheduler, App Insights, Worker Role)",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Women, Infants and Children (WIC) Program is the Special Supplemental Nutrition Program for Women, Infants, and Children. This is a federally funded program administered through the Texas Department of State Health Services (DSHS) and serves to safeguard the health of low-income women, infants, and children up to age five who are at nutritional risk by providing nutritious foods to supplement diets, information on healthy eating, breastfeeding information and support, and referrals to health care. <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The State has contracted for a modernized Management Information System (MIS) and Reporting platform for the Texas WIC Information Network. A platform to efficiently manage the applicants and participants of this program. The system should allow applicants to be enrolled to the program provided they meet the stipulated eligibility guidelines. A fully managed service offering is being provided by leveraging Microsoft Cloud Technologies like Microsoft CRM Online, Microsoft Azure and Microsoft O365."

        }, {
            name: "WIPRO CRM Integrations",
            client: "WIPRO, Bangalore, India",
            duration: "Nov 2014 - Apr 2015",
            technology: "Dynamics CRM 2015, C#, WebApi, HTML, <br>JavaScript, Yammer, SharePoint 2013",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Wipro team was planning to upgrade their existing CRM system from 2011 to 2015. As part of their upgrade they wanted to develop a custom integration between CRM and other external applications. The overall goal of this project was to enable the integration between:<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>CRM – Yammer:</b> CRM Supports OOB integration with Yammer. All conversations created from CRM are posted to the same group in Yammer. Wipro had a custom requirement to have a group created for each record within CRM. This would ensure that only a specified set of users is granted access to the group. There was also integration built to add users to the Yammer Group directly from CRM.<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>CRM – Office 365:</b> The requirement was to build a global calendar to display the appointments from CRM and Office 365. This provided users with a consolidated view of all the activities assigned to them.<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>CRM – SharePoint:</b> The scope of this requirement was to restrict access to the SharePoint folder based on the security permissions of the entity record within CRM."
        }, {
            name: "BAT - Visit Management System",
            client: "British American Tobacco, UK",
            duration: "Jan 2014 – Oct 2014",
            technology: "Dynamics CRM 2015, C#, WebApi, HTML, <br>JavaScript",
            description: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BAT (British American Tobacco) is one of the largest tobacco manufactures spanning several counties. They have many outlets spread across each continent. There were looking for an efficient system to manage their outlets and all activities related to these outlets. As part of their audit activity, they send their representatives to the outlets to assess and evaluate the stock, package placement, etc. <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The scope of this engagement was to build a robust system to capture the visit execution details and enable efficient tracking of the visits. One of the requirement from the customer was that the data entry should be possible when the representatives are visiting the store i.e. when their handheld device is offline. The solution was build taking that into consideration and consuming the offline capability of Outlook for CRM. This allowed the representatives to easily sync the data back once the system is connected online. <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Based on the business requirement from BAT, the sales module was customized to allow the representatives and the admin to capture the outlet, contact, visit, planning, etc. Batch jobs were developed to indicate the end of every planning cycle and push the new set of activities to each representative."
        }],
        skills: [{
            name: "C#",
            percentage: 80
        }, {
            name: "MS Dynamics CRM",
            percentage: 80
        }, {
            name: "D3.js",
            percentage: 40
        }, {
            name: "Client-Side Development",
            percentage: 70
        }, {
            name: "Microsoft Azure",
            percentage: 30
        }],
        id: "MsWork"
    }];
    var cirRadius = 5,
        startOfLine = cy - 26,
        endOfLine = cy - 140,
        titleCircle = 8;

    svg.selectAll("circle.employmentDt")
        .data(employmentDetails)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            svg.append("circle")
                .attr("cx", yearScale(d.start))
                .attr("cy", cy)
                .attr("r", 0)
                .attr("fill", d.color)
                .attr("class", "employmentDt")
                .transition()
                .duration(1000)
                .delay(function (d, i) {
                    return (i + 2) * 500;
                })
                .attr("r", cirRadius);

            return yearScale(d.end);
        })
        .attr("cy", cy)
        .attr("r", 0)
        .attr("fill", function (d) {
            return d.color;
        })
        .attr("class", "employmentDt")
        .transition()
        .duration(1000)
        .delay(function (d, i) {
            return (i + 2) * 500;
        })
        .attr("r", function (d) {
            if (d.end > (new Date()).addDays(-1)) {
                return 0;
            } else {
                return 5;
            }
        })

    svg.selectAll("path.employmentDt")
        .data(employmentDetails)
        .enter()
        .append("path")
        .on("click", function (d) {
            d3.select("#divProjectDetails").remove();

            displayOverlay();

            logTrace("Clicked on the project details for " + d.id);

            var mapExpandedWidth = 0.7 * document.body.clientWidth - 10,
                mapExpandedHeight = 0.8 * document.body.clientHeight - 20,
                divContainer = d3.select("body")
                    .append("div")
                    .attr("class", "videoContainerSection")
                    .attr("id", "divProjectDetails")
                    .style("top", (document.body.clientHeight - mapExpandedHeight - 50) / 2 + "px")
                    .style("left", (document.body.clientWidth - mapExpandedWidth - 40) / 2 + "px")
                    .style("width", (mapExpandedWidth) + "px")
                    .style("height", (mapExpandedHeight) + "px")
                    .style("padding", "0px");

            divContainer.append("div")
                .attr("class", "videoContainerHeader");

            divContainer.append("img")
                .attr("class", "videoContainerImg")
                .attr("src", "./media/img/close.png")
                .attr("title", "Close")
                .on("click",
                    function () {
                        hideOverlay();
                        d3.select("#divProjectDetails").remove();
                    });

            var divContent = divContainer.append("div")
                .attr("class", "videoContent")
                .style("height", (mapExpandedHeight - 30 - 10 * 2) + "px");

            var tableRow = divContent.append("table")
                .style("height", "100%")
                .style("width", "100%")
                .attr("border", "0")
                .append("tr");

            var projDetails = tableRow.append("td")
                .style("width", "50%")
                .attr("valign", "top")
                .attr("id", "projDetails_description_" + d.id);

            var projSummary = tableRow.append("td")
                .attr("valign", "top");

            var skillContainer = projSummary.append("svg")
                .attr("width", "100%")
                .attr("height", "100%");

            var skillPosition = {
                pos_0: {
                    x: 140,
                    y: 80
                },
                pos_1: {
                    x: 400,
                    y: 80
                },
                pos_2: {
                    x: 270,
                    y: 230
                },
                pos_3: {
                    x: 140,
                    y: 400
                },
                pos_4: {
                    x: 400,
                    y: 400
                }
            }


            //var boxHeight = projSummary["0"]["0"].clientHei

            if (d.skills) {
                d.skills.map(function (skillDetails, index) {
                    drawSkillPercentage(skillContainer,
                        skillPosition["pos_" + index].x,
                        skillPosition["pos_" + index].y,
                        skillDetails.percentage,
                        skillDetails.name,
                        d.id);
                });
            }

            var projContent = "<div style='height: " +
                (document.getElementById("projDetails_description_" + d.id).offsetHeight - 10) +
                "px;overflow-y:auto;padding-right:10px'><table class='tbProjDetails' border=0>";


            projContent += "<tr><td class='projLeftSide'>Joining Date:</td><td>" +
                d.start.getDate().toString().paddingLeft("00") +
                "-" +
                (d.start.getMonth() + 1).toString().paddingLeft("00") +
                "-" +
                d.start.getFullYear() +
                "</td></tr>";

            var currentDate = new Date();
            currentDate.setHours(0);
            currentDate.setMinutes(0);
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);

            if (d.end && d.end < currentDate) {
                projContent += "<tr><td class='projLeftSide'>Last Working Day:</td><td>" +
                    d.end.getDate().toString().paddingLeft("00") +
                    "-" +
                    (d.end.getMonth() + 1).toString().paddingLeft("00") +
                    "-" +
                    d.end.getFullYear() +
                    "</td></tr>";
            }
            projContent += "<tr><td class='projLeftSide'>Location:</td><td>" + d.location + "</td></tr>";
            projContent +=
                "<tr><td class='projLeftSide' style='padding-left:0px;padding-top:20px' colspan=2 valign='top'><img src='media/img/collapse.png' class='respImg' align='center' onclick='expandCollapseDiv(this);'>&nbsp;Responsibilities:";
            if (d.responsibilities) {
                projContent += "<div style='padding-left:30px;padding-top:8px;'><ul class='respList'>";
                d.responsibilities.forEach(function (item, index) {
                    projContent += "<li>" + item + "</li>";
                });
                projContent += "</ul></div>";
            }
            projContent += "</td></tr>";

            projContent +=
                "<tr><td class='projLeftSide' style='padding-left:0px;padding-top:20px' colspan=2 valign='top'><img src='media/img/collapse.png' class='respImg' align='center' onclick='expandCollapseDiv(this);'>&nbsp;Projects:";
            if (d.projects) {
                projContent += "<div style='padding-left:12px;padding-top:8px;'>";
                projContent += "<table class='projDescription' border=0>";
                d.projects.forEach(function (item, index) {
                    projContent +=
                        "<tr><td class='projDescLeftSide'>Project:</td><td class='projDescRightSide'>" +
                        item.name +
                        "</td></tr>";
                    projContent +=
                        "<tr><td class='projDescLeftSide'>Customer:</td><td class='projDescRightSide'>" +
                        item.client +
                        "</td></tr>";
                    projContent +=
                        "<tr><td class='projDescLeftSide'>Duration:</td><td class='projDescRightSide'>" +
                        item.duration +
                        "</td></tr>";
                    projContent +=
                        "<tr><td class='projDescLeftSide'>Technologies Used:</td><td class='projDescRightSide'>" + item.technology + "</td></tr>";
                    projContent +=
                        "<tr><td class='projDescLeftSide'>Description:</td><td class='projDescRightSide' style='padding-bottom:40px'>" + item.description + "</td></tr>";
                });
                projContent += "</table></div>";
            }
            projContent += "</td></tr>";

            projContent += "</table></div>";

            projDetails.html(projContent);
        })
        .attr("fill", function (d) {
            return d.color;
        })
        .attr("class", "employmentDt")
        .style("cursor", "pointer")
        .transition()
        .duration(1000)
        .delay(function (d, i) {
            return i * 1000;
        })
        .each("start", function () {
            d3.select(this).attr("d",
                function (d) {
                    var endDate = new Date(d.start.getTime());
                    endDate.setDate(endDate.getDate() + 120);
                    return drawEmploymentPath(d.start, new Date(endDate), cy, cirRadius);
                });

            d3.select(this).append("title").text("Click for further details");
        })
        .attr("d", function (d) {
            return drawEmploymentPath(d.start, d.end, cy, cirRadius);
        });


    svg.selectAll("line.employmentDt")
        .data(employmentDetails)
        .enter()
        .append("line")
        .attr("x1", function (d, i) {
            var lineStart = yearScale(d.start) + 23,
                adjustedEndOfLine = endOfLine - titleCircle - d.titleBuffer;

            svg.append("circle")
              .attr("cx", lineStart)
              .attr("cy", startOfLine + 2)
              .attr("r", 0)
              .attr("fill", "black")
              .attr("class", "infoLine")
              .transition()
              .delay((i + 2) * 500)
              .duration(500)
              .attr("r", 2);

            svg.append("circle")
                .attr("cx", lineStart)
                .attr("cy", adjustedEndOfLine - 2)
                .attr("r", 0)
                .attr("fill", d.color)
                .attr("class", "infoLine")
                .transition()
                .delay((i + 2) * 700)
                .duration(500)
                .attr("r", titleCircle);

            svg.append("text")
                .attr("dx", lineStart - 3)
                .attr("dy", adjustedEndOfLine + 2)
                .attr("fill", "white")
                .attr("font-size", "1")
                .attr("font-weight", "bold")
                .text("F")
                .attr("class", "infoLine")
                .transition()
                .delay((i + 2) * 700)
                .duration(500)
                .attr("font-size", "11");

            // Description
            svg.append("text")
                .attr("dx", lineStart + titleCircle + 5)
                .attr("dy", adjustedEndOfLine + 2)
                .attr("fill", "white")
                .attr("font-size", "1")
                .attr("font-weight", "bold")
                .attr("font-family", "Verdana, Arial, Helvetica, sans-serif")
                .text(d.companyName)
                .attr("class", "infoLine")
                .transition()
                .delay((i + 2) * 700)
                .duration(500)
                .attr("fill", "black")
                .attr("font-size", "11");

            svg.append("text")
                .attr("dx", lineStart + titleCircle + 5)
                .attr("dy", adjustedEndOfLine + 15)
                .attr("fill", "white")
                .attr("font-size", "1")
                .attr("font-weight", "normal")
                .attr("font-family", "Verdana, Arial, Helvetica, sans-serif")
                .text(d.jobTitle)
                .attr("class", "infoLine")
                .transition()
                .delay((i + 2) * 700)
                .duration(500)
                .attr("fill", "black")
                .attr("font-size", "10");

            svg.append("text")
                .attr("dx", lineStart + titleCircle + 5)
                .attr("dy", adjustedEndOfLine + 29)
                .attr("fill", "white")
                .attr("font-size", "1")
                .attr("font-weight", "normal")
                .attr("font-family", "Verdana, Arial, Helvetica, sans-serif")
                .text(d.jobLocation)
                .attr("class", "infoLine")
                .transition()
                .delay((i + 2) * 700)
                .duration(500)
                .attr("fill", "rgb(150,150,156)")
                .attr("font-size", "10");

            d3.select(this).attr("x2", lineStart);
            return lineStart;
        }) // x position of the first end of the line
        .attr("y1", startOfLine) // y position of the first end of the line
        .transition()
        .duration(1000)
        .delay(function (d, i) {
            return (i + 2) * 500;
        })
        .each("start",
            function () {
                d3.select(this).attr("y2", startOfLine);
            })
        .attr("y2", function (d) {
            return (endOfLine - d.titleBuffer);
        })
        .style("stroke-dasharray", ("1, 1"))
        .attr("stroke", "black")
        .attr("class", "employmentDt");
}

function plotTimeline(svg) {

    svg.append("path")
        .attr("d", mainTimeLine(timelinexStart, timelineyStart, timelineWidth, timelineHeight, 20))
        .attr("fill", "url(#timelineGradient)");

    var allYears = [],
        i = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate());
    for (i = i; i < endDate; i.setFullYear(i.getFullYear() + 1)) {
        allYears.push(new Date(i.getFullYear(), i.getMonth(), i.getDate()));
    }

    allYears.pop();

    var monthBars = svg.selectAll("line")
        .data(allYears)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            var xAxis = parseFloat(yearScale(d));
            if (xAxis >= range.lowerBound && xAxis <= range.upperBound)
                return xAxis;
            else if (xAxis < range.lowerBound) {
                return range.lowerBound - 25;
            } else if (xAxis > range.upperBound) {
                return range.upperBound + 25;
            }
        }) //<<== change your code here
        .attr("y1", (timelineyStart + 5))
        .attr("x2", function (d) {
            var xAxis = parseFloat(yearScale(d));
            if (xAxis >= range.lowerBound && xAxis <= range.upperBound)
                return xAxis;
            else if (xAxis < range.lowerBound) {
                return range.lowerBound - 25;
            } else if (xAxis > range.upperBound) {
                return range.upperBound + 25;
            }
        }) //<<== and here
        .attr("y2", (timelineyStart + 42 - 6))
        .attr("class", "monthBar");

    svg.selectAll("text.legend")
        .data(allYears)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "red")
        .attr('transform', function (d) {
            var xAxis = parseFloat(yearScale(d));
            if (xAxis >= range.lowerBound && xAxis <= range.upperBound)
                return 'translate(' + (yearScale(d) + 18) + ', ' + (timelineyStart + 25) + ')';
            else if (xAxis < range.lowerBound) {
                return 'translate(' + (range.lowerBound - 50) + ', ' + (timelineyStart + 25) + ')';
            } else if (xAxis > range.upperBound) {
                return 'translate(' + (range.upperBound + 50) + ', ' + (timelineyStart + 25) + ')';
            }

            //return 'translate(' + (monthScale(d) + 17) + ', ' + (-115 + 20) + ')';
        })
        .attr("class", "legend")
        .text(function (d) {
            return d.getFullYear();
        });
}

function removeClickEvent(pathId) {
    d3.select("#skillInfoSection").remove();

    pageNames.map(function (item) {
        if (item.id == pathId) {
            d3.select("#" + pathId).on("click", null);
            d3.select("#" + pathId).style("cursor", "default");

            for (i = 0; i < item.label.length; i++) {
                d3.select("#" + item.id + "_Label_" + i).on("click", null);
                d3.select("#" + item.id + "_Label_" + i).style("cursor", "default");
            }
        }
        else {
            d3.select("#group_" + item.id).remove();
            d3.select("#" + item.id).on("click", function () { pageChange(item.id); });
            for (i = 0; i < item.label.length; i++) {
                d3.select("#" + item.id + "_Label_" + i).on("click", function () { pageChange(item.id); });
                d3.select("#" + item.id + "_Label_" + i).style("cursor", "pointer");
            }
            d3.select("#" + item.id).style("cursor", "pointer");
        }
    });
}

function resizeEnd() {
    if (new Date() - resizeTime < timeDelta) {
        setTimeout(resizeEnd, timeDelta);
    } else {
        resizeTimeout = false;
        d3.select("#tdContent").html("");
        d3.select("#tdLeftSection").html("");
        d3.select("#imgProfile").remove();
        d3.select("#mapDiv").remove();
        if (tip) {
            tip.hide();
        }
        plotBothPages();
    }
}

function drawSummaryPage() {
    var summaryPageName = pageNames[2].id;

    removeClickEvent(summaryPageName);

    var summaryGroup = svg.append("g")
        .attr("id", "group_" + summaryPageName)
        .attr("transform", "translate(0,0)");

    plotTimeline(summaryGroup);

    drawEmploymentArea(summaryGroup, timelineyStart);

    plotOnsiteTravelDetails(summaryGroup, timelineyStart + timelineHeight);

    plotOtherAchievements(summaryGroup, timelineyStart + timelineHeight);

    plotTotalWorkExperience(summaryGroup, new Date(2004, 10, 23), mainPageHeight * 0.85); // + timelineHeight + 180 (2 * timelineyStart * 1)

    showPersonalDetailsOption(summaryGroup);
}

function applyBGGradient(svg) {

    svg.append("linearGradient")
        .attr("id", "bgGradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", "100%").attr("y1", "100%")
        .attr("x2", "100%").attr("y2", "0%")
        .selectAll("stop")
        .data([{
            offset: "0%",
            color: "rgb(120,73,21)"
        }, {
            offset: "100%",
            color: "rgb(120,71,15)"
        }])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
            return d.offset;
        })
        .attr("stop-color", function (d) {
            return d.color;
        });

    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "url(#bgGradient)");
}

function plotMySkillSet1(svg) {
    var skillGroup = svg.append("g")
        .attr("transform", "translate(" + (tdContentWidth * .10) + ",0)");

    drawCircularPath(skillGroup, 500, 600);
}

function breakString(input, length) {
    if (input && length) {
        var result = "";
        if (input.length <= length) {
            return input;
        }
        else {
            while (input.length > length) {
                result += input.substring(0, length) + " ";
                input = input.substring(length, input.length);
            }

            result += input;

            return result;
        }
    }

    return "";
}

function reloadSkillSets(currentSkill) {
    var allSkillSections = d3.selectAll("path.skillSetPath"),
                    allSkillNameSections = d3.selectAll("text.skillName"),
                    yearsUsed = currentSkill ? currentSkill.attr("yearsUsed").split(",") : [];
    if (allSkillSections && allSkillSections.length > 0) {
        allSkillSections[0].map(function (section, index) {
            if (currentSkill && d3.select(section).attr("skillId") != currentSkill.attr("skillId")) {
                d3.select(section).attr("opacity", "0.2");
            } else {
                d3.select(section).attr("opacity", "1");
            }
        });
    }

    if (allSkillNameSections && allSkillNameSections.length > 0) {
        allSkillNameSections[0].map(function (section, index) {
            if (currentSkill && d3.select(section).attr("skillId") != currentSkill.attr("skillId")) {
                d3.select(section).attr("opacity", "0.2");
            } else {
                d3.select(section).attr("opacity", "1");
            }
        });
    }

    for (i = 2004; i <= ((new Date()).getFullYear() + 4) ; i++) {
        if (currentSkill && yearsUsed.indexOf(i.toString()) < 0) {
            d3.select("#year_" + i).attr("opacity", "0.2");
            d3.select("#yearLabel_" + i).attr("opacity", "0.2");
        } else {
            d3.select("#year_" + i).attr("opacity", "1");
            d3.select("#yearLabel_" + i).attr("opacity", "1");
        }

    }
}

function plotMySkillSet() {
    var skillSetPageName = pageNames[1].id;

    removeClickEvent(skillSetPageName);
    var skillGroup = svg.append("g")
        .attr("id", "group_" + skillSetPageName)
        .attr("transform", "translate(0,0)");

    var innerRadius = (((tdContentHeight / 2) - 80) > 293.5 ? 293.5 : ((tdContentHeight / 2) - 80)),
        outerRadius = (((tdContentHeight / 2) - 60) > 313.5 ? 313.5 : ((tdContentHeight / 2) - 60)),
        outerArc = d3.svg.arc()
        .cornerRadius(5)
       .innerRadius(innerRadius)
       .outerRadius(outerRadius)
       .startAngle(function (d) { return d.startAngle * (Math.PI / 180); })
       .endAngle(function (d) { return d.endAngle * (Math.PI / 180); }),
        radiusX = (tdContentWidth / 2),
        radiusY = ((tdContentHeight / 2) - 10),
        endYear = ((new Date()).getFullYear() + 4),
        arcRanges = [],
        degreeRange = d3.scale.linear().domain([2004, endYear]).range([0, 360]);

    /* Creating the outer year arc */
    /* Start */
    for (i = 2004; i <= (endYear - 4) ; i++) {
        arcRanges.push({
            year: i,
            startAngle: degreeRange(i),
            endAngle: degreeRange(i + 1) - 0.5
        });
    }

    skillGroup.selectAll("path.skillYear")
        .data(arcRanges)
        .enter()
        .append("path")
        .attr("d", outerArc)
        .attr("id", function (d, i) {
            return "year_" + d.year;
        })
        .attr("fill", "rgb(255,176,169)")
        .attr("class", "skillYear")
        .attr("transform", "translate(" + radiusX + "," + radiusY + ")");

    skillGroup.append("text")
           .text("Years")
           .attr("text-anchor", "end")
           .attr("transform", "translate(" + (radiusX - 10) + "," + (radiusY - ((outerRadius + innerRadius) / 2) + 4) + ")")
           .attr("class", "yearHeaderName");

    skillGroup.selectAll("text.yearLabel")
        .data(arcRanges)
        .enter()
        .append("text")
        .attr("x", function (d) {
            return (((d.startAngle + d.endAngle) / 2) - d.startAngle) * outerRadius * (Math.PI / 180);
        })
        .attr("dy", 15)
        .attr("class", "yearLabel")
        .attr("id", function (d) {
            return "yearLabel_" + d.year;
        })
        .append("textPath")
        .attr("xlink:href", function (d) {
            return "#year_" + d.year;
        })
        .style("text-anchor", "middle") //place the text halfway on the arc
        .text(function (d) {
            return d.year;
        });
    /* End */

    var skillSets = [{
        skill: "C#",
        skillId: "CSharp",
        percentage: 70,
        yearsUsed: "2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017",
        yearsRange: "2004-Present",
        tipDesc: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I was always interested in OOPs programming since the start of coding days (during early college years). I started with PASCAL, C, C++ before making a full-time transition to C#. Though all the projects that I have worked on so far had C# or VB.NET as the back-end language, I would like to make a special mention of SAR and Texas WIC. These are projects that involved a major refactoring of the design framework and I was fortunate enough to have been part of those."
    }, {
        skill: "JavaScript",
        skillId: "Javascript",
        percentage: 80,
        yearsUsed: "2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017",
        yearsRange: "2004-Present",
        tipDesc: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What is web-development without JavaScript? I was always fascinated with the power of JavaScript. Still remember writing my own code using xmlHttpRequest which is now usually hidden under wrapper frameworks like jquery, angular, etc. I was involved in developing several reusable plugins like Auto-Complete, Editable Grids, Expandable Grids, Outlook, etc. <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Somehow the client-side development always interested me more than the server-side development. It could be this interest that has made me to side-line always with web-based projects throughout my career. "
    }, /*{
        skill: "HTML",
        skillId: "HTML",
        percentage: 65,
        yearsUsed: "2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017",
        yearsRange: "2004-Present"
    },*/ {
        skill: "D3.js",
        skillId: "D3js",
        percentage: 55,
        yearsUsed: "2015,2016,2017",
        yearsRange: "2015-Present",
        tipDesc: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sometime early in 2015, I was playing around with Microsoft Social Engagement (MSE), a tool which provides a detailed analysis of the social sentiment of your brand. The tool collects the posts from different sources like LinkedIn, Facebook, twitter and presents a neat visualization of the data. This is what that could have aroused my interest in the world of data visualization and the fact that it could transform some otherwise boring data into meaningful insights only added to the curiosity. I have been encouraging the team to use this for my last project and were able to develop some “talking” charts to the customer. <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This interactive resume is another attempt to learn the full capabilities of this library."
    }, {
        skill: "SQL Server",
        skillId: "SQLServer",
        yearsUsed: "2004,2005,2006,2007,2008,2009",
        yearsRange: "2004-2009",
        percentage: 45,
        tipDesc: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I have been working on SQL Server ever since I started working on .NET Projects. Most of the projects had SQL as its back-end database. As a result, I was very actively involved in the design, development and optimization of the databases. I was also briefly involved to work as a SQL Administrator. These included activities like taking backup, replication, etc."
    }, {
        skill: "ASP.NET",
        skillId: "ASPNet",
        yearsUsed: "2004,2005,2006,2007,2008,2009,2010,2011,2012",
        yearsRange: "2004-2012",
        percentage: 50,
        tipDesc: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Most of the web-based projects that I have worked on before joining Microsoft was on ASP.NET. While I was definitely involved in the development of the project, I used to contribute to the design and optimization of the code as well. Have spent a significant amount of time in reviews and training of other members of the team on ASP.NET"
    }, /*{
        skill: "Oracle 11G",
        skillId: "Oracle11G",
        yearsUsed: "2009,2010,2011,2012",
        yearsRange: "2009-2012",
        percentage: 30,
        tipDesc: "Before joining Microsoft, I was working on .NET and web-based technologies for around 8 years. I was looking for a shift to a new domain & technology and that’s when this opportunity to work for Microsoft came by. So, I have been working on Microsoft Dynamics CRM for the last 4 years. I started with CRM 2011 and soon graduated to 2016/Dynamics 365. During my tenure here in Microsoft, I have worked with several noteworthy clients like NEC, Wipro Technologies, HT Media, etc. <br>For the last two years, I have been engaged with a project for Texas WIC (Women, Infant & Children). The solution helps to efficiently manage the applicants and participants of this program. The system should allow applicants to be enrolled to the program provided they meet the stipulated eligibility guidelines."
    },*/ {
        skill: "MS CRM 2013/2015",
        skillId: "MSCRM",
        percentage: 90,
        yearsUsed: "2013,2014,2015,2016,2017",
        yearsRange: "2013-Present",
        tipDesc: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Before joining Microsoft, I was working on .NET and web-based technologies for around 8 years. I was looking for a shift to a new domain & technology and that’s when this opportunity to work for Microsoft came by. I have been working on Microsoft Dynamics CRM for the last 4 years. I started with CRM 2011 and soon graduated to 2016/Dynamics 365. During my tenure here in Microsoft, I have worked with several noteworthy clients like NEC, Wipro Technologies, HT Media, etc. <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For the last two years, I have been engaged with a project for Texas WIC (Women, Infant & Children). The solution helps to efficiently manage the applicants and participants of this program. The system should allow applicants to be enrolled to the program provided they meet the stipulated eligibility guidelines."

    }],
        skillDataSets = [],
        skillArc = d3.svg.arc()
                       .cornerRadius(100)
                       .innerRadius(function (d) { return d.innerRadius; })
                       .outerRadius(function (d) { return d.outerRadius; })
                       .startAngle(0),
        startArc = innerRadius - 30,
        percentageRange = d3.scale.linear().domain([0, 100]).range([0, 360]),
        colorCode = d3.scale.linear().domain([0, 100])
                    .interpolate(d3.interpolateHcl)
                    .range([d3.rgb("rgb(236,230,193)"), d3.rgb('rgb(76,79,140)')]);
    //.range([d3.rgb("rgb(236,230,193)"), d3.rgb('rgb(128,115,40)')]);

    skillSets.sort(function (a, b) {
        return parseFloat(b.percentage) - parseFloat(a.percentage);
    });

    skillSets.map(function (skillSet, index) {
        function arcTween(newAngle) {
            return function (d) {
                var interpolate = d3.interpolate(d.endAngle, newAngle);
                return function (t) {
                    d.endAngle = interpolate(t);
                    return skillCurve(d);
                };
            };
        }

        var innerRadius = startArc - 15 - 20 * index,
            outerRadius = startArc - 20 * index,
            skillCurve = d3.svg.arc()
                            .cornerRadius(20)
                            .innerRadius(innerRadius)
                            .outerRadius(outerRadius)
                            .startAngle(0);

        skillGroup.append("text")
            .text(skillSet.skill)
            .attr("text-anchor", "end")
            .attr("transform", "translate(" + (radiusX - 10) + "," + (radiusY - ((outerRadius + innerRadius) / 2) + 4) + ")")
            .attr("skillId", skillSet.skillId)
            .attr("class", "skillName");

        skillGroup.append("path")
            .datum({
                endAngle: 0.001
            })
            .attr("d", skillCurve)
            .attr("fill", colorCode(skillSet.percentage))
            .attr("originalColor", colorCode(skillSet.percentage))
            .attr("skillId", skillSet.skillId)
            .style("cursor", "pointer")
            .attr("class", "skillSetPath")
            .attr("yearsUsed", skillSet.yearsUsed)
            .attr("transform", "translate(" + radiusX + "," + radiusY + ")")
            .on("mouseover", function (d) {
                reloadSkillSets(d3.select(this));

                if (!document.getElementById("skillInfoSection")) {
                    var tipContent = (skillSet.tipDesc && skillSet.tipDesc.length > 450 ? skillSet.tipDesc.substring(0, 450) + "...<i><b>(more)</b></i>" : skillSet.tipDesc) + "<br><br><b>Click for more details<b>";
                    tip.show(tipContent);
                }
                else {
                    d3.select("#skillInfoSectionSkillName").text(skillSet.skill);
                    d3.select("#skillInfoSectionPercentage").text(skillSet.percentage + "%");
                    d3.select("#skillInfoSectionYearsUsed").text(skillSet.yearsRange);
                    d3.select("#skillInfoSectionDescription").html(skillSet.tipDesc);
                }
            })
            .on("mousemove", function () {
                if (tip) {
                    tip.style("left", (d3.event.pageX + 20) + "px")
                        .style("top", (d3.event.pageY + 20) + "px");
                }
            })            
            .on("mouseout", function () {
                tip.hide(skillSet);

                if (!document.getElementById("skillInfoSection")) {
                    d3.selectAll("path.skillSetPath").attr("opacity", "1");
                    d3.selectAll("text.skillName").attr("opacity", "1");
                    d3.selectAll("path.skillYear").attr("opacity", "1");
                    d3.selectAll("text.yearLabel").attr("opacity", "1");
                }
            })
            .on("click", function () {
                tip.hide(skillSet);
                if (!document.getElementById("skillInfoSection")) {
                    logTrace("Clicked on the skill: " + skillSet.skill);
                    var skillGroup = d3.select("#group_" + pageNames[1].id);

                    skillGroup.transition()
                        .duration(750)
                        .attr("transform", "translate(-200, 0)");

                    var width = (tdContentWidth - (((tdContentHeight / 2) - 60) + (tdContentWidth / 2) - 40 - 50)) * 0.9;

                    var skillGroupInfo = skillGroup.append("g")
                                            .attr("transform", "translate(" + (((tdContentHeight / 2) - 60) + (tdContentWidth / 2) - 40) + ",0)");

                    setTimeout(function () {
                        var divContainer = d3.select("body")
                                                .append("div")
                                                .attr("class", "skillInfoContainerSection")
                                                .attr("id", "skillInfoSection")
                                                .style("top", ((tdContentHeight - mainPageHeight) / 2) + 20 + "px")
                                                .style("left", (tdLeftWidth + ((tdContentHeight / 2) - 60) + (tdContentWidth / 2) - 40 - 100) + "px")
                                                .style("width", width + "px")
                                                .style("height", (mainPageHeight * 0.9 - 100) + "px")
                                                .style("padding", "0px");

                        //divContainer.append("img")
                        //        .attr("class", "videoContainerImg")
                        //        .attr("src", "media/img/close.png")
                        //        .on("click", function () {
                        //            d3.select("#skillInfoSection").remove();

                        //            d3.select("#skillGroup")
                        //                .transition()
                        //                .duration(750)
                        //                .attr("transform", "translate(0, 0)");

                        //            reloadSkillSets();
                        //        });

                        //divContainer.append("svg")
                        //    .attr("x", 0)
                        //    .attr("y", 100)
                        //    .attr("width", "100%")
                        //    .attr("height","100px")
                        //    .append("line")
                        //    .attr("x1", 0)
                        //    .attr("y1", 0)
                        //    .attr("x2", 500)
                        //    .attr("y2",0)
                        //    .attr("stroke", "red")
                        //    .attr("stroke-width", 2)
                        //    ;

                        divContainer.append("div")
                            .attr("class", "skillInfoTable")
                            .html("<table border=0 class='skillInfoInnerTable'>\
                                    <tr>\
                                        <td class='skillInfoTd'>Skill:</td>\
                                        <td class='skillInfoContent' id='skillInfoSectionSkillName'>" + skillSet.skill + "</td>\
                                    </tr>\
                                    <tr>\
                                        <td class='skillInfoTd'>Expertise Level:</td>\
                                        <td class='skillInfoContent' id='skillInfoSectionPercentage'>" + skillSet.percentage + "%" + "</td>\
                                    </tr>\
                                    <tr>\
                                        <td class='skillInfoTd'>Years Worked Upon:</td>\
                                        <td class='skillInfoContent' id='skillInfoSectionYearsUsed'>" + skillSet.yearsRange /*breakString(skillSet.yearsUsed, 15)*/ + "</td>\
                                    </tr>\
                                    <tr>\
                                        <td colspan=2 class='skillInfoDescriptionTd'>Description:</td>\
                                    </tr>\
                                    <tr>\
                                        <td colspan=2 class='skillInfoDescriptionContentTd' id='skillInfoSectionDescription'>" + skillSet.tipDesc + "</td>\
                                    </tr>\
                                   </table>");

                        divContainer.append("div")
                            .attr("class", "skillInfoDismissContainer")
                            .attr("title", "Click to close")
                            .text("DISMISS ME")
                            .on("click", function () {
                                d3.select("#skillInfoSection").remove();

                                d3.select("#group_" + pageNames[1].id)
                                    .transition()
                                    .duration(750)
                                    .attr("transform", "translate(0, 0)");

                                reloadSkillSets();
                            });
                    }, 750);

                    //divContainer.append("div")
                    //    .attr("class", "skillContainerHeader");

                    //.append("rect")
                    //.attr("x", 150)
                    //.attr("y", (tdContentHeight - mainPageHeight)/2)
                    //.attr("height", mainPageHeight* 0.95 - 100)
                    //.attr("width", width)
                    //.attr("fill", "red");
                }

            })
            .transition()
            .duration(1500)
            .attrTween("d", arcTween(2 * Math.PI * skillSet.percentage / 100));
    });
}

function drawSkillPercentage(svg, x, y, percentage, skillName, id) {
    function arcTween(newAngle) {
        return function (d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function (t) {
                d.endAngle = interpolate(t);
                return skillLevel(d);
            };
        };
    }

    var innerCircleRad = 32,
        outerCircleRad = 70;

    var outerArc = d3.svg.arc()
        .innerRadius(innerCircleRad)
        .outerRadius(outerCircleRad)
        .startAngle(0)
        .endAngle(7);

    var skillLevel = d3.svg.arc()
        .innerRadius(innerCircleRad)
        .outerRadius(outerCircleRad)
        .startAngle(0);
    //.endAngle(2 * Math.PI * percentage / 100);

    var skillLevel1 = d3.svg.arc()
        .innerRadius(innerCircleRad)
        .outerRadius(outerCircleRad)
        .startAngle(0)
        .endAngle(2 * Math.PI);

    var colorCode;


    switch (id) {
        case "InfyWork":
            colorCode = d3.scale.linear().domain([1, 100])
                        .interpolate(d3.interpolateHcl)
                        .range([d3.rgb("rgb(151,188,215)"), d3.rgb('rgb(151,188,215)')]);
            break;
        case "OracleWork":
            colorCode = d3.scale.linear().domain([1, 100])
                        .interpolate(d3.interpolateHcl)
                        .range([d3.rgb("rgb(211,182,154)"), d3.rgb('rgb(211,182,154)')]);
            break;
        case "MsWork":
            colorCode = d3.scale.linear().domain([1, 100])
                        .interpolate(d3.interpolateHcl)
                        .range([d3.rgb("rgb(171,196,161)"), d3.rgb('rgb(171,196,161)')]);
            break;
    }


    svg.append("path")
        .attr("d", outerArc)
        .attr("fill", "rgb(248,232,214)")
        .attr("transform", "translate(" + x + "," + y + ")");

    svg.append("path")
        .datum({
            endAngle: 0
        })
        .attr("d", skillLevel)
        //.attr("fill", "rgb(179,19,19)")
        .attr("fill", colorCode(percentage))//"rgb(240,123,0)")
        //.attr("fill", "rgb(254,69,73)")
        //.attr("fill","rgb(76,91,112)")
        .attr("transform", "translate(" + x + "," + y + ")")
        .transition()
        .duration(1500)
        .attrTween("d", arcTween(2 * Math.PI * percentage / 100));

    svg.append("text")
        .text(percentage + "%")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + x + "," + (y + 5) + ")")
        .attr("font-family", "Tahoma, Geneva, sans-serif")
        .attr("font-weight", 700)
        .attr("font-size", 12)
        .attr("fill", "rgb(159,116,93)");

    svg.append("text")
        .text(skillName)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + x + "," + (y + outerCircleRad + 20) + ")")
        .attr("font-family", "Tahoma, Geneva, sans-serif")
        .attr("font-weight", 700)
        .attr("font-size", 12)
        .attr("fill", "rgb(159,116,93)");

}

function pageChange(pageName) {
    logTrace(pageName + " has been clicked");
    switch (pageName) {
        case pageNames[0].id:
            //Interests Page
            alert("Still working on this...");
            break;
        case pageNames[1].id:
            //Skills Page
            plotMySkillSet();
            break;

        case pageNames[2].id:
            //Experience Page
            drawSummaryPage();
            break;
    }
}

function drawCircularPath(group, innerHeight, outerHeight) {
    var innerCircleStartY = (tdContentHeight - innerHeight) / 2,
        innerCircleEndY = (tdContentHeight + innerHeight) / 2,
        outerCircleStartY = innerCircleEndY + ((outerHeight - innerHeight) / 2),
        outerCircleEndY = innerCircleStartY - ((outerHeight - innerHeight) / 2),
        innerCircleX = 450,
        outerCircleX = 800,
        arcCircle = 100;

    group.append("path")
        .attr("d", "M" + innerCircleX + "," + innerCircleStartY +
            "Q" + (innerCircleX + arcCircle) + "," + tdContentHeight / 2 + " " + innerCircleX + "," + innerCircleEndY +
            "L" + outerCircleX + "," + outerCircleStartY +
            "Q" + (outerCircleX + arcCircle) + "," + tdContentHeight / 2 + " " + outerCircleX + "," + outerCircleEndY + "z")
        .attr("fill", "rgb(59,113,141)");

    var circleDiagonal = Math.sqrt(Math.pow(outerCircleX - innerCircleX, 2) + Math.pow(outerCircleEndY - innerCircleStartY, 2));
    var circleLinearScaleX = d3.scale.linear().domain([0, circleDiagonal]).range([0, outerCircleX - innerCircleX]),
        circleLinearScaleY = d3.scale.linear().domain([0, circleDiagonal]).range([0, innerCircleStartY - outerCircleEndY]),
        midPoint = innerCircleX + (outerCircleX - innerCircleX) / 2,
        spacerWidth = 2,
        linearLeftScaleX = circleLinearScaleX(circleDiagonal * 0.75 - spacerWidth),
        linearRightScaleX = circleLinearScaleX(circleDiagonal * 0.75 + spacerWidth),
        linearLeftScaleY = circleLinearScaleY(circleDiagonal * 0.75 - spacerWidth),
        linearRightScaleY = circleLinearScaleY(circleDiagonal * 0.75 + spacerWidth);

    // Partial Color Area
    group.append("path")
        .attr("d", "M" + innerCircleX + "," + innerCircleStartY +
            "Q" + (innerCircleX + arcCircle) + "," + tdContentHeight / 2 + " " + innerCircleX + "," + innerCircleEndY +
            "L" + (innerCircleX + linearLeftScaleX) + "," + (innerCircleEndY + linearLeftScaleY) +
            "Q" + (innerCircleX + linearLeftScaleX + arcCircle) + "," + tdContentHeight / 2 + " " + (innerCircleX + linearLeftScaleX) + "," + (innerCircleStartY - linearLeftScaleY) + "z")
        .attr("fill", "rgb(92,153,186)"); //rgb(123,153,23)rgb(219,156,3)

    group.append("path")
        .attr("d", "M" + (innerCircleX + linearLeftScaleX) + "," + (innerCircleStartY - linearLeftScaleY) +
            "Q" + (innerCircleX + linearLeftScaleX + arcCircle) + "," + tdContentHeight / 2 + " " + (innerCircleX + linearLeftScaleX) + "," + (innerCircleEndY + linearLeftScaleY) +
            "L" + (innerCircleX + linearRightScaleX) + "," + (innerCircleEndY + linearRightScaleY) +
            "Q" + (innerCircleX + linearRightScaleX + arcCircle) + "," + tdContentHeight / 2 + " " + (innerCircleX + linearRightScaleX) + "," + (innerCircleStartY - linearRightScaleY) + "z")
        .attr("fill", "white");

    var totalExperienceYears = [],
        empStart = new Date(2004, 10, 23),
        now = new Date();
    for (var currDate = empStart; currDate < now; currDate = new Date(currDate.getFullYear() + 1, 1, currDate.getDate())) {
        totalExperienceYears.push(currDate.getFullYear());
    }

    totalExperienceYears.pop();

    var cYearLeftx = function (t) {
        return benzierCurvePointCalculation(t, (innerCircleX + linearRightScaleX), (innerCircleX + linearRightScaleX + arcCircle), (innerCircleX + linearRightScaleX));
    },
        cYearLefty = function (t) {
            return benzierCurvePointCalculation(t, (innerCircleStartY - linearRightScaleY), (tdContentHeight / 2), (innerCircleEndY + linearRightScaleY));
        },
        cYearRightx = function (t) {
            return benzierCurvePointCalculation(t, outerCircleX, (outerCircleX + arcCircle), outerCircleX);
        },
        cYearRighty = function (t) {
            return benzierCurvePointCalculation(t, outerCircleEndY, (tdContentHeight / 2), outerCircleStartY);
        };

    group.selectAll("line")
        .data(totalExperienceYears)
        .enter()
        .append("line")
        .attr("x1", function (d, i) {
            var lineStarty = cYearLefty(1 / (totalExperienceYears.length + 1) * (i + 1)),
                lineStartx = cYearLeftx(1 / (totalExperienceYears.length + 1) * (i + 1)),
                lineEndx = cYearRightx(1 / (totalExperienceYears.length + 1) * (i + 1)),
                lineEndy = cYearRighty(1 / (totalExperienceYears.length + 1) * (i + 1));


            d3.select(this).attr("y1", lineStarty);
            d3.select(this).attr("x2", lineEndx);
            d3.select(this).attr("y2", lineEndy);

            displayYearText(group, d, (cYearLeftx(1 / ((totalExperienceYears.length + 1) * 2) * (2 * i + 1)) + cYearRightx(1 / ((totalExperienceYears.length + 1) * 2) * (2 * i + 1))) / 2, ((cYearLefty(1 / ((totalExperienceYears.length + 1) * 2) * (2 * i + 1)) + cYearRighty(1 / ((totalExperienceYears.length + 1) * 2) * (2 * i + 1))) / 2 + 5), angle(lineStartx, lineStarty, lineEndx, lineEndy))

            return lineStartx;
        })
        .attr("stroke-width", "3")
        .attr("stroke", "white");

    displayYearText(group, (new Date()).getFullYear(), (cYearLeftx(1 / ((totalExperienceYears.length + 1) * 2) * (2 * totalExperienceYears.length + 1)) + cYearRightx(1 / ((totalExperienceYears.length + 1) * 2) * (2 * totalExperienceYears.length + 1))) / 2, (cYearLefty(1 / ((totalExperienceYears.length + 1) * 2) * (2 * totalExperienceYears.length + 1)) + cYearRighty(1 / ((totalExperienceYears.length + 1) * 2) * (2 * totalExperienceYears.length + 1))) / 2 + 5,
        angle(cYearLeftx(1 / (totalExperienceYears.length + 1) * (totalExperienceYears.length + 1)), cYearLefty(1 / (totalExperienceYears.length + 1) * (totalExperienceYears.length + 1)), cYearRightx(1 / (totalExperienceYears.length + 1) * (totalExperienceYears.length + 1)), cYearRighty(1 / (totalExperienceYears.length + 1) * (totalExperienceYears.length + 1))));

    var cProjLeftx = function (t) {
        return benzierCurvePointCalculation(t, innerCircleX, innerCircleX + arcCircle, innerCircleX);
    },
        cProjLefty = function (t) {
            return benzierCurvePointCalculation(t, innerCircleStartY, (tdContentHeight / 2), innerCircleEndY);
        },
        cProjRightx = function (t) {
            return benzierCurvePointCalculation(t, (innerCircleX + linearLeftScaleX), (innerCircleX + linearLeftScaleX + arcCircle), (innerCircleX + linearLeftScaleX));
        },
        cProjRighty = function (t) {
            return benzierCurvePointCalculation(t, (innerCircleStartY - linearLeftScaleY), (tdContentHeight / 2), (innerCircleEndY + linearLeftScaleY));
        };

    var allAvailableProjects = [{
        Desc: "Initial Training",
        StartDate: "23 Oct 2004",
        EndDate: "30 Mar 2005"
    }, {
        Desc: "Portal Development",
        StartDate: "01 Apr 2005",
        EndDate: "31 Jan 2006"
    }, {
        Desc: "Goldmine Business Intelligence Tool",
        StartDate: "01 Feb 2006",
        EndDate: "31 Oct 2007"
    }, {
        Desc: "SMART",
        StartDate: "01 Dec 2007",
        EndDate: "30 May 2008"
    }, {
        Desc: "CATALYST",
        StartDate: "01 May 2008",
        EndDate: "30 May 2009"
    }, {
        Desc: "SAR",
        StartDate: "01 May 2009",
        EndDate: "30 Dec 2012"
    }, {
        Desc: "NEC CRM Implementation",
        StartDate: "01 Feb 2013",
        EndDate: "30 Mar 2014"
    }, {
        Desc: "TraCE CRM Upgrade",
        StartDate: "01 April 2014",
        EndDate: "30 March 2015"
    }, {
        Desc: "Texas WIC CRM",
        StartDate: "01 April 2015",
        EndDate: "30 Dec 2016"
    }],
        projDurationScale = d3.time.scale().domain([new Date(2004, 01, 01), new Date(2016, 12, 30)]).range([0, 1]);

    group.selectAll("line.leftLine")
        .data(allAvailableProjects)
        .enter()
        .append("line")
        .attr("x1", function (d, i) {
            var dateScale = projDurationScale(new Date(d.StartDate)),
                lineStarty = cProjLefty(dateScale),
                lineStartx = cProjLeftx(dateScale),
                lineEndx = cProjRightx(dateScale),
                lineEndy = cProjRighty(dateScale);


            d3.select(this).attr("y1", lineStarty);
            d3.select(this).attr("x2", lineEndx);
            d3.select(this).attr("y2", lineEndy);

            if (i < allAvailableProjects.length - 1) {
                displayYearText(group, d.Desc, (cProjLeftx(projDurationScale(new Date((new Date(allAvailableProjects[i + 1].StartDate).getTime() + new Date(d.StartDate).getTime()) / 2))) + cProjRightx(projDurationScale(new Date((new Date(allAvailableProjects[i + 1].StartDate).getTime() + new Date(d.StartDate).getTime()) / 2)))) / 2, (cProjLefty(projDurationScale(new Date((new Date(allAvailableProjects[i + 1].StartDate).getTime() + new Date(d.StartDate).getTime()) / 2))) + cProjRighty(projDurationScale(new Date((new Date(allAvailableProjects[i + 1].StartDate).getTime() + new Date(d.StartDate).getTime()) / 2)))) / 2 + 5, angle(lineStartx, lineStarty, lineEndx, lineEndy));
            } else {
                displayYearText(group, d.Desc, (cProjLeftx(projDurationScale(new Date((new Date(d.EndDate).getTime() + new Date(d.StartDate).getTime()) / 2))) + cProjRightx(projDurationScale(new Date((new Date(d.EndDate).getTime() + new Date(d.StartDate).getTime()) / 2)))) / 2, (cProjLefty(projDurationScale(new Date((new Date(d.EndDate).getTime() + new Date(d.StartDate).getTime()) / 2))) + cProjRighty(projDurationScale(new Date((new Date(d.EndDate).getTime() + new Date(d.StartDate).getTime()) / 2)))) / 2 + 5, angle(lineStartx, lineStarty, lineEndx, lineEndy));
            }

            //group.append("text")
            //     .text(d)
            //     .attr("text-anchor", "middle")
            //     .attr("transform", "translate(" +  + "," +  + ") rotate(" + angle(lineStartx, lineStarty, lineEndx, lineEndy) + ")")
            //     .attr("font-family", "Tahoma, Geneva, sans-serif")
            //     .attr("font-weight", 500)
            //     .attr("font-size",15)
            //     //.attr("y", )
            //     //.attr("x", )
            //     .attr("fill", "white");

            return lineStartx;
        })
        .attr("stroke-width", "1.5")
        .attr("stroke", "white")
        .attr("class", "leftLine");

    //group.append("circle")
    //   .attr("cx", cProjLeftx(1 / ((totalExperienceYears.length + 1) * 2) * (2 * totalExperienceYears.length + 1)))
    //   .attr("cy", cProjLefty(1 / ((totalExperienceYears.length + 1) * 2) * (2 * totalExperienceYears.length + 1)))
    //   .attr("r", "5")
    //   .attr("fill", "red");

    //group.append("circle")
    //   .attr("cx", innerCircleX + linearLeftScaleX)
    //   .attr("cy", innerCircleStartY - linearLeftScaleY)
    //   .attr("r", "5")
    //   .attr("fill", "red");

    // Skill Names
    var skillSets = [{
        skill: "C#",
        years: [{
            startDate: "01 Apr 2005",
            endDate: "31 Jan 2006",
            daysBuffer: 50,
            arcCircle: 2
        }, {
            startDate: "01 Feb 2006",
            endDate: "31 Oct 2007",
            daysBuffer: 50,
            arcCircle: 6
        }, {
            startDate: "01 Dec 2007",
            endDate: "30 May 2008",
            daysBuffer: 50,
            arcCircle: 2
        }, {
            startDate: "01 May 2008",
            endDate: "30 May 2009",
            daysBuffer: 50,
            arcCircle: 2
        }, {
            startDate: "01 May 2009",
            endDate: "30 Dec 2012",
            daysBuffer: 50,
            arcCircle: 2
        }, {
            startDate: "01 Feb 2013",
            endDate: "30 Mar 2014",
            daysBuffer: 50,
            arcCircle: -2
        }, {
            startDate: "01 April 2014",
            endDate: "30 March 2015",
            daysBuffer: 50,
            arcCircle: -4
        }, {
            startDate: "01 April 2015",
            endDate: "30 Dec 2016",
            daysBuffer: 50,
            arcCircle: -7
        }],
        className: "Csharp",
        tipDesc: "I was always interested in OOPs programming since the start of my coding days (during early college years). I started with PASCAL, C, C++ before making a full time transition to C#. Though all the projects that I have worked on so far had C# or VB.NET as the back-end language, I would like to make a special mention of SAR and Texas WIC. These are projects that involved a major refactoring of the design framework and I was fortunate enough to have been part of those."
    }, {
        skill: "JavaScript",
        years: [{
            startDate: "01 Apr 2005",
            endDate: "31 Jan 2006",
            daysBuffer: 50,
            arcCircle: 2
        }, {
            startDate: "01 Feb 2006",
            endDate: "31 Oct 2007",
            daysBuffer: 50,
            arcCircle: 6
        }, {
            startDate: "01 Dec 2007",
            endDate: "30 May 2008",
            daysBuffer: 50,
            arcCircle: 2
        }, {
            startDate: "01 May 2008",
            endDate: "30 May 2009",
            daysBuffer: 50,
            arcCircle: 2
        }, {
            startDate: "01 May 2009",
            endDate: "30 Dec 2012",
            daysBuffer: 50,
            arcCircle: 4
        }, {
            startDate: "01 Feb 2013",
            endDate: "30 Mar 2014",
            daysBuffer: 50,
            arcCircle: -2
        }, {
            startDate: "01 April 2014",
            endDate: "30 March 2015",
            daysBuffer: 50,
            arcCircle: -4
        }, {
            startDate: "01 April 2015",
            endDate: "30 Dec 2016",
            daysBuffer: 50,
            arcCircle: -7
        }],
        className: "Javascript",
        tipDesc: "What is web-development without JavaScript? Was always fascinated with the power of JavaScript. Still remember writing my own code using xmlHttpRequest which is now usually hidden under wrapper frameworks like jquery, angular, etc. Was involved in developing several reusable plugins like Auto-Complete, Editable Grids, Expandable Grids, Outlook, etc. It could be this interest that has made me to sideline always with web-based projects throughout my career."
    }, {
        skill: "HTML",
        years: [{
            startDate: "23 Oct 2004",
            endDate: "31 Dec 2016"
        }]
    }, {
        skill: "D3.js",
        years: [{
            startDate: "01 April 2015",
            endDate: "30 Dec 2016",
            daysBuffer: 50,
            arcCircle: -7
        }],
        className: "D3js",
        tipDesc: "Sometime early last year, I was playing around with Microsoft Social Engagement (MSE), a tool which provides a detailed analysis of the social sentiment of your brand. The tool collects the posts from different sources like LinkedIn, Facebook, twitter and presents a neat visualization of the data. This is what that could have aroused my interest in the world of data visualization and the fact that it could transform some otherwise boring data into meaningful insights only added to the curiosity. I have been encouraging the team to use this for my last project and were able to develop some “talking” charts to the customer. This interactive resume is another attempt to learn the full capabilities of this library."
    }, {
        skill: "SQL Server",
        years: [{
            startDate: "23 Oct 2004",
            endDate: "31 Dec 2016"
        }]
    }, {
        skill: "ASP.NET",
        years: [{
            startDate: "23 Oct 2004",
            endDate: "31 Dec 2016"
        }]
    }, {
        skill: "Oracle 11G",
        years: [{
            startDate: "01 May 2009",
            endDate: "30 Dec 2012",
            daysBuffer: 50,
            arcCircle: 7
        }],
        className: "Oracle"
    }, {
        skill: "MS CRM 2013/2015",
        years: [{
            startDate: "23 Oct 2004",
            endDate: "31 Dec 2016"
        }]
    }],
        unitHeight = 40,
        xBuffer = 200,
        unitWidth = 20,
        areaBuffer = unitHeight * 0.1,
        initialYPos = (tdContentHeight - unitHeight * skillSets.length) / 2,
        mapLine = d3.svg.line().interpolate("basis").x(function (d) {
            return d.x;
        }).y(function (d) {
            return d.y;
        });

    group.selectAll("rect")
        .data(skillSets)
        .enter()
        .append("rect")
        .attr("x", xBuffer)
        .attr("y", function (d, i) {

            var startPos = (initialYPos + unitHeight * i + 1 + areaBuffer),
                endPos = (initialYPos + unitHeight * (i + 1) - areaBuffer),
                individualWidth = (endPos - startPos) / d.years.length;

            if (i < skillSets.length - 1) {
                for (j = 0; j < d.years.length; j++) {
                    var dateStartScale = projDurationScale((new Date(d.years[j].startDate)).addDays(d.years[j].daysBuffer)),
                        skillStarty = cProjLefty(dateStartScale),
                        skillStartx = cProjLeftx(dateStartScale),
                        dateEndScale = projDurationScale((new Date(d.years[j].endDate)).addDays(-d.years[j].daysBuffer)),
                        skillEndy = cProjLefty(dateEndScale),
                        skillEndx = cProjLeftx(dateEndScale);

                    group.append("path")
                        //.attr("d", mapLine([{ x: xBuffer + unitWidth - 1, y: initialYPos + unitHeight * i + 1 }, { x: (innerCircleX + xBuffer) / 2, y: ((initialYPos + unitHeight * i) + innerCircleStartY) / 2 - 50 }, { x: innerCircleX, y: innerCircleStartY }]))
                        .attr("d", "M" + (xBuffer + unitWidth - 1) + "," + (startPos + j * individualWidth) +
                            "S" + (skillStartx + xBuffer + unitWidth - 1) / 2 + "," + (((initialYPos + unitHeight * i) + skillStarty) / 2 - 25) + " " + skillStartx + "," + skillStarty + // + innerCircleX + "," + innerCircleEndY +
                            "Q" + (skillStartx + d.years[j].arcCircle) + "," + (skillStarty + skillEndy) / 2 + " " + skillEndx + "," + skillEndy +
                            "S" + (skillEndx + xBuffer + unitWidth - 1) / 2 + "," + (((initialYPos + unitHeight * (i + 1)) + skillEndy) / 2 - 30) + " " + (xBuffer + unitWidth - 1) + "," + (startPos + (j + 1) * individualWidth))
                        //"L" + (innerCircleX + linearLeftScaleX) + "," + (innerCircleEndY + linearLeftScaleY) +

                    .attr("stroke", "red")
                        .attr("opacity", 0.5)
                        .attr("stroke-width", "0")
                        .attr("class", "skillPath" + d.className)
                        .attr("fill", "rgb(200,137,108)");
                }
            }

            return initialYPos + unitHeight * i;
        })
        .attr("width", unitWidth)
        .attr("height", unitHeight)
        .attr("fill", "rgb(179,19,19)")
        .attr("stroke-width", 1)
        .style("cursor", "pointer")
        .on("mouseover", function (d) {
            tip.show(d.tipDesc);
            d3.select(this).attr("fill", "green");
            for (s = 0; s < skillSets.length; s++) {
                if (skillSets[s].className != d.className) {
                    d3.selectAll("path.skillPath" + skillSets[s].className).attr("opacity", 0.1);
                } else {
                    d3.selectAll("path.skillPath" + skillSets[s].className).attr("opacity", 0.7);
                }
            }
        })
        .on("mouseout", function (d) {
            tip.hide(d);
            for (s = 0; s < skillSets.length; s++) {
                d3.selectAll("path.skillPath" + skillSets[s].className).attr("opacity", 0.5);
            }
        })
        .attr("stroke", "white");

    group.selectAll("text.skillLabel")
        .data(skillSets)
        .enter()
        .append("text")
        .attr("text-anchor", "end")
        .attr("class", "skillLabel")
        .attr('transform', function (d, i) {
            return 'translate(' + (xBuffer - 5) + ',' + ((initialYPos + 4) + unitHeight * i + unitHeight / 2) + ')';
        })
        .text(function (d) {
            return d.skill;
        });


    // Skill Variation
    var skillScale = d3.scale.linear()
        .domain([10, 0])
        .range([0, unitHeight * skillSets.length]);

    var skillAxis = d3.svg.axis()
        .scale(skillScale).orient("right");

    svg.append("linearGradient")
        .attr("id", "skillSetGradient")
        .attr("spreadMethod", "pad")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%")
        .selectAll("stop")
        .data([{
            offset: "0%",
            color: "rgb(85,0,71)"
        }, {
            offset: "100%",
            color: "rgb(136,148,193)"
        }
            //{ offset: "50%", color: "green" },
        ])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
            return d.offset;
        })
        .attr("stop-color", function (d) {
            return d.color;
        });

    group.append("rect")
        .attr("x", 10)
        .attr("y", initialYPos)
        .attr("width", 10)
        .attr("height", unitHeight * skillSets.length)
        .attr("fill", "url(#skillSetGradient)");

    group.append("g").attr("class", "skillAxis").attr("transform", "translate(" + 20 + "," + initialYPos + ")").call(skillAxis);
}

function displayYearText(svgElement, text, x, y, theta) {
    svgElement.append("text")
        .text(text)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + x + "," + y + ") rotate(" + theta + ")")
        .attr("font-family", "Tahoma, Geneva, sans-serif")
        .attr("font-weight", 500)
        .attr("font-size", 15)
        .attr("fill", "white");

}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

function benzierCurvePointCalculation(t, xy1, xy2, xy3) {
    return (1 - t) * (1 - t) * xy1 + 2 * (1 - t) * t * xy2 + t * t * xy3;
}

function plotLeftSideOfResume(svg) {
    var leftSideWidth = tdLeftWidth - 30,
        xLeftStart = tdLeftWidth - xStart,
        yLeftStart = (tdContentHeight - (mainPageHeight - 100)) / 2,
        calendarBuffer = leftSideWidth * 0.1,
        eachDayWidth = (leftSideWidth - xStart) * 0.76 / 7,
        calendarYStart = yStart + 15,
        weekTitleYStart = calendarYStart + 40,
        weekTitleULine = weekTitleYStart + 10,
        calendarTitleWidth = (leftSideWidth - xStart) * 0.75,
        weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        calendarMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    svg.append("rect")
        .attr("x", xLeftStart)
        .attr("y", yLeftStart)
        .attr("width", xStart)
        .attr("height", (mainPageHeight - 100))
    //.attr("fill", "url(#mainPageGradient)");
        .attr("fill", "white");

    svg.append("path")
        .attr("d", secondPageBorder(xLeftStart, yStart, leftSideWidth, mainPageHeight, radius))
        .attr("class", "mainBookSection")
        .attr("fill", "url(#mainPageGradient)");

    svg.append("rect")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer)
        .attr("y", calendarYStart)
        .attr("width", calendarTitleWidth)
        .attr("height", 24)
        .attr("fill", "rgb(56,70,71)");

    svg.append("text")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer + calendarTitleWidth / 2)
        .attr("y", calendarYStart + 16)
        .attr("text-anchor", "middle")
        .attr("class", "calendarTitle")
        .attr("height", 24)
        .text(calendarMonth[(new Date()).getMonth()]);

    svg.selectAll("text.weekDays")
        .data(weekDays)
        .enter()
        .append("text")
        .attr("class", "weekDays")
        .attr("fill", function (d, i) {
            return i > 0 ? "rgb(56,70,71)" : "red";
        })
        .attr("x", function (d, i) {
            return xLeftStart - leftSideWidth + calendarBuffer + 4 + i * eachDayWidth;
        })
        .attr("y", weekTitleYStart)
        .text(function (d) {
            return d;
        });

    svg.append("line")
        .attr("x1", xLeftStart - leftSideWidth + calendarBuffer)
        .attr("y1", weekTitleULine)
        .attr("x2", xLeftStart - leftSideWidth + calendarBuffer + calendarTitleWidth)
        .attr("y2", weekTitleULine)
        .attr("stroke-width", 1)
        .attr("stroke", "rgb(56,70,71)");

    var allDaysInCurrentMonth = [],
        currDate = new Date(),
        startOfMonth = new Date(currDate.getFullYear(), currDate.getMonth(), 1),
        endOfMonth = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0),
        linePosition = 0;

    for (var d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
        if (new Date(d).getDay() == 0 && new Date(d).getDate() != 1) {
            linePosition++;
        }

        allDaysInCurrentMonth.push({
            day: new Date(d),
            position: linePosition
        });
    }

    svg.selectAll("text.monthDays")
        .data(allDaysInCurrentMonth)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "monthDays")
        .attr("fill", function (d, i) {
            if (d.day.getDate() == currDate.getDate() && d.day.getMonth() == currDate.getMonth() && d.day.getFullYear() == currDate.getFullYear()) {
                svg.append("rect")
                    .attr("x", xLeftStart - leftSideWidth + calendarBuffer + d.day.getDay() * eachDayWidth)
                    .attr("y", weekTitleULine + 26 + (d.position - 1) * 20)
                    .attr("width", eachDayWidth)
                    .attr("height", 20)
                    .attr("fill", "rgba(56,70,71,0.2)");
            }
            return d.day.getDay() > 0 ? "rgb(56,70,71)" : "red";
        })
        .attr("x", function (d, i) {
            return xLeftStart - leftSideWidth + calendarBuffer + eachDayWidth / 2 + d.day.getDay() * eachDayWidth;
        })
        .attr("y", function (d) {
            return weekTitleULine + 20 + d.position * 20;
        })
        .text(function (d) {
            return d.day.getDate();
        });


    var profileImageWidth = 100;

    var nameYAxis = mainPageHeight - 270,
        profileImageHeight = 120;

    d3.select("body")
            .append("img")
            //.style('top', (weekTitleULine + 55 + (allDaysInCurrentMonth[allDaysInCurrentMonth.length - 1].position + 1) * 20) + "px")
            .style('top', (nameYAxis - profileImageHeight - 30) + "px")
            .style('left', (xLeftStart - leftSideWidth + calendarBuffer + (calendarTitleWidth - profileImageWidth) / 2) + "px")
            .style("position", "absolute")
            .style("border-radius", "50%")
            .attr('width', profileImageWidth)
            .attr('height', 120)
            .attr("id", "imgProfile")
            .attr("src", "media/img/profile_image.jpg");

    svg.append("text")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer + calendarTitleWidth / 2)
        .attr("y", nameYAxis)
        .attr("text-anchor", "middle")
        .attr("class", "nameFormat")
        .text("VIKAS RAJAN");

    svg.append("line")
        .attr("x1", xLeftStart - leftSideWidth + calendarBuffer)
        .attr("y1", nameYAxis + 8)
        .attr("x2", xLeftStart - leftSideWidth + calendarBuffer + calendarTitleWidth)
        .attr("y2", nameYAxis + 8)
        .attr("stroke", "rgb(56,70,71)")
        .attr("stroke-width", 1);

    svg.append("text")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer + calendarTitleWidth / 2)
        .attr("y", nameYAxis + 30)
        .attr("text-anchor", "middle")
        .attr("class", "jdFormat")
        .text("CRM Consultant");

    svg.append("image")
        .attr("xlink:href", "email.png")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer + 10)
        .attr("y", nameYAxis + 60)
        .attr("width", "14")
        .attr("height", "14");

    svg.append("text")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer + 32)
        .attr("y", nameYAxis + 71)
        .attr("text-anchor", "start")
        .attr("class", "emailLabel")
        .text("virajan@microsoft.com");

    svg.append("image")
        .attr("xlink:href", "phone.png")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer + 10)
        .attr("y", nameYAxis + 90)
        .attr("width", "14")
        .attr("height", "14");

    svg.append("text")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer + 32)
        .attr("y", nameYAxis + 101)
        .attr("text-anchor", "start")
        .attr("class", "phoneAddrLabel")
        .text("+919663581144");

    svg.append("image")
        .attr("xlink:href", "home.gif")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer + 10)
        .attr("y", nameYAxis + 120)
        .attr("width", "14")
        .attr("height", "14");

    svg.append("text")
        .attr("x", xLeftStart - leftSideWidth + calendarBuffer + 32)
        .attr("y", nameYAxis + 131)
        .attr("text-anchor", "start")
        .attr("class", "phoneAddrLabel")
        .text("Bangalore, Karnataka, India");

    //d3.select("body").append("div")
    //    .attr("class", "mapDivSection")
    //    .style("width", calendarTitleWidth + "px")
    //    .style("height", "120px")
    //    .style("top", (nameYAxis + 151) + "px")
    //    .style("left", (xLeftStart - leftSideWidth + calendarBuffer) + "px")
    //    .attr("id", "mapDiv");

    d3.select("body")
        .append("div")
        .attr("id", "mapDiv");

    d3.select("#mapDiv")
        .attr("class", "mapDivSection")
        .style("width", calendarTitleWidth + "px")
        .style("height", "120px")
        .style("top", (nameYAxis + 151) + "px")
        .style("left", (xLeftStart - leftSideWidth + calendarBuffer) + "px");

    try {

        currentLoc = new google.maps.LatLng(13.019282, 77.657083);
        officeLoc = new google.maps.LatLng(13.044831, 77.622109);
        //d3.select("#mapDiv").node()
        map = new google.maps.Map(document.getElementById("mapDiv"), {
            zoom: 8,
            center: currentLoc,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        google.maps.event.addListener(map, 'click', function () {
            if (!(d3.select("#mapDiv").attr("expanded") != null && d3.select("#mapDiv").attr("expanded") == "true")) {
                var mapExpandedWidth = 0.7 * document.body.clientWidth,
                    mapExpandedHeight = 0.7 * document.body.clientHeight;

                displayOverlay();

                var mapDivContainer = d3.select("body").append("div")
                                        .attr("class", "mapContainerSection")
                                        .attr("id", "mapDivContainer")
                                        .style("top", (document.body.clientHeight - mapExpandedHeight - 30) / 2 + "px")
                                        .style("left", (document.body.clientWidth - mapExpandedWidth - 30) / 2 + "px")
                                        .style("width", mapExpandedWidth + "px")
                                        .style("height", mapExpandedHeight + "px");

                mapDivContainer.append("div")
                        .attr("class", "videoContainerHeader");

                mapDivContainer.append("img")
                    .attr("class", "videoContainerImg")
                    .attr("src", "./media/img/close.png")
                    .attr("title", "Close")
                    .on("click", function () {
                        d3.select("#mapDivContainer").remove();
                        d3.select("#mapDiv")
                            .attr("expanded", "false")
                            .style("width", calendarTitleWidth + "px")
                            .style("height", "120px")
                            .style("top", (nameYAxis + 151) + "px")
                            .style("left", (xLeftStart - leftSideWidth + calendarBuffer) + "px");

                        google.maps.event.trigger(map, "resize");
                        hideOverlay();
                    });

                d3.select("#mapDiv")
                    .style("top", ((document.body.clientHeight - mapExpandedHeight) / 2 + 15) + "px")
                    .style("left", ((document.body.clientWidth - mapExpandedWidth) / 2 - 15) + "px")
                    .style("width", mapExpandedWidth + "px")
                    .attr("expanded", "true")
                    .style("height", (mapExpandedHeight - 38) + "px");
                //map.updateSize();
                google.maps.event.trigger(map, "resize");
                map.panTo(currentLoc);
                map.setZoom(10);

                d3.select("body").append("div")
                    .attr("id", "marker-tooltip")
                    .style("display", "none")
                    .style("z-index", 800);

                var marker = new google.maps.Marker({
                    position: currentLoc,
                    map: map,
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
                marker.tooltipContent = 'My home...Click for details.';

                var officerMarker = new google.maps.Marker({
                    position: officeLoc,
                    map: map
                });
                officerMarker.tooltipContent = 'My workplace...Click for details.';

                var infoWindow = new google.maps.InfoWindow({
                    content: '<font class="marker-content">303, 1st Block, <br>SMR Vinay Estate<br>Horamavu Main Road<br>Bangalore-560043</font>'
                });

                var officeInfoWindow = new google.maps.InfoWindow({
                    content: '<font class="marker-content">Microsoft Global Services Center (India) Private Limited<br>Embassy Manyata Business Park<br>E2 Block, Silver Oak, B-wing, 4th Floor,<br>Nagawara Outer Ring Road,<br>Bangalore 560045<br><br>Ph: +91 080 6758 3000<br>Fax: +91 080 6758 3456<br>Website: <a href="https://www.microsoft.com/india/globaldelivery/default.aspx" target="_blank">https://www.microsoft.com/india/globaldelivery/default.aspx</a></font>'
                });

                google.maps.event.addListener(marker, 'mouseover', function () {
                    var linkedMap = infoWindow.getMap();
                    if (!(linkedMap !== null && typeof linkedMap !== "undefined")) {
                        var point = fromLatLngToPoint(marker.getPosition(), map);
                        d3.select("#marker-tooltip")
                            .html(marker.tooltipContent)
                            .style("left", ((window.innerWidth - mapExpandedWidth) / 2 + 5 + point.x) + "px")
                            .style("top", ((window.innerHeight - mapExpandedHeight) / 2 + 5 + point.y) + "px")
                            .style("display", "block");
                    }
                });

                google.maps.event.addListener(officerMarker, 'mouseover', function () {
                    var linkedMap = officeInfoWindow.getMap();
                    if (!(linkedMap !== null && typeof linkedMap !== "undefined")) {
                        var point = fromLatLngToPoint(officerMarker.getPosition(), map);
                        d3.select("#marker-tooltip")
                            .html(officerMarker.tooltipContent)
                            .style("left", ((window.innerWidth - mapExpandedWidth) / 2 + 5 + point.x) + "px")
                            .style("top", ((window.innerHeight - mapExpandedHeight) / 2 + 5 + point.y) + "px")
                            .style("display", "block");
                    }
                });

                google.maps.event.addListener(marker, 'mouseout', function () {
                    d3.select("#marker-tooltip")
                        .style("display", "none");
                });

                google.maps.event.addListener(officerMarker, 'mouseout', function () {
                    d3.select("#marker-tooltip")
                        .style("display", "none");
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open(map, marker);
                    d3.select("#marker-tooltip")
                        .style("display", "none");
                });

                google.maps.event.addListener(officerMarker, 'click', function () {
                    officeInfoWindow.open(map, officerMarker);
                    d3.select("#marker-tooltip")
                        .style("display", "none");
                });
            }
        });
    } catch (e) { }
}

// the smooth zoom function
function smoothZoom(map, max, cnt) {
    if (cnt >= max) {
        return;
    } else {
        z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function () {
            map.setZoom(cnt)
        }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}

function fromLatLngToPoint(latLng, map) {
    var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    var scale = Math.pow(2, map.getZoom());
    var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
    return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

function drawBookMarkText(svg, txt, x, y, width, height, id) {
    var txtSeparator = 8,
        fontSize = 9,
        endPos = y + (height - txt.length * fontSize - ((txt.length - 4) * txtSeparator)) / 2,
        startPos = x + (width - fontSize) / 2 + 3;

    for (i = 0; i < txt.length; i++) {
        svg.append("text")
            .attr("text-anchor", "start")
            .attr("class", "bookmarkLabel")
            .attr('transform', 'translate(' + startPos + ',' + (endPos + i * (txtSeparator + fontSize)) + ')')
            .attr("id", id + "_Label_" + i)
            .style("cursor", "pointer")
            .on("click", function () { pageChange(id); })
            .text(txt[i]);
    }
}
