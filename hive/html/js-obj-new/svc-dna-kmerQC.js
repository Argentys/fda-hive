/*
 *  ::718604!
 * 
 * Copyright(C) November 20, 2014 U.S. Food and Drug Administration
 * Authors: Dr. Vahan Simonyan (1), Dr. Raja Mazumder (2), et al
 * Affiliation: Food and Drug Administration (1), George Washington University (2)
 * 
 * All rights Reserved.
 * 
 * The MIT License (MIT)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

if (!javaScriptEngine) var javaScriptEngine = vjJS["undefined"];
google.load("visualization", "1", {packages:["corechart"]});

vjHO.register('svc-dna-kmerQC').Constructor=function ()
{
    
    //for example here, we will get an empty results sub object
    this.fullview=function(node, whereToAdd)
    {
        console.log("Constructing Full view from svc-dna-kmerQC.js");
        // This is how to get the an argument from URL
        // In this case, we want to know about the 'id'
        var id = docLocValue("id");
        
        /***********************************
         *  Create a datasource 
         *  @param1: the title which is shown in the loading box
         *  @param2: the name of the datasource
         *  @param3: the url
         *  @param4: refresh call back (optional)
         *  @param5: add the header (optional) => use when you when you that the returned data from the server does not have the header  
         */
        vjDS.add("Loading...", "dsResult", "qpbg_tblqryx4://dna-kmerQC-result.csv//raw=1&cols=0-200&objs="+thisProcessID);
        vjDS.add("Loading...", "dsResult2", "qpbg_tblqryx4://dna-kmerQC-filtered-result.csv//raw=1&cols=0-200&objs="+thisProcessID);

        
        /*********************************** 
         * Create a Table View from a datasource
         * Mandatory:
         *         data: datasourcename
         */
        
//        var tbl = new vjTableView({
//            data: "kmer-result"
//        });
//                
//        var graph=new vjGoogleGraphView({
//            data: 'kmer-result',
//            type: "column",
//            series:[ 
//                    {col:"0", lable:true},  // it can be defined by the column header name or column number
//                    {col:"1"},
//            ],
//              options:{
////                  title: "K-mer Frequency",
////                  hAxis: { title: 'K-mer'},
////                  vAxis: {title: 'Appearance'},
////                  legend: { position: 'top', alignment:'end' }
//                            
//               }
//        });

        var tbl = new vjTableView({
            data: "dsResult"
        });

        var linegraph=new vjGoogleGraphView({
              data: 'dsResult'
             ,type: "line"
             ,series:[ 
                  {col:"0",label:true}  // it can be defined by the column header name or column number
                  ,{col:"1"}
              ]
           ,options:{
               title: "K-mer Frequency",
            hAxis: { title: 'K-mer'},
            vAxis: {title: 'Appearance'},
            legend: { position: 'top', alignment:'end' }
                                                    
           }
        });
        
        var filtered=new vjGoogleGraphView({
              data: 'dsResult2'
             ,type: "line"
             ,series:[ 
                  {col:"0",label:true}  // it can be defined by the column header name or column number
                 ,{col:"1"}
             ]
         ,options:{
             title: "Filtered K-mer Frequency (80%)",
            hAxis: { title: 'K-mer'},
            vAxis: {title: 'Appearance'},
            legend: { position: 'top', alignment:'end' }
                                                    
         }
        });
        
        
        
           var filesStructureToAdd = [
      
          {
              tabId: 'resultsTable', 
              tabName: "Results Table",
              position: {posId: 'resultsTable', top:'0', bottom:'100%', left:'80%', right:'100%'},
              viewerConstructor: {
                  instance: [tbl]
              },
                autoOpen: ["computed"]
          },
          {
               tabId: 'kmerGraph', 
               tabName: "K-mer Frequency",
               position: {posId: 'graphArea1', top:'0', bottom:'40%', left:'20%', right:'80%'},
               viewerConstructor: {
                   instance: [linegraph]
               },
                 autoOpen: ["computed"]
          },
          {
               tabId: 'kmerfilteredGraph', 
               tabName: "Filtered K-mer Frequency",
               position: {posId: 'graphArea2', top:'40%', bottom:'100%', left:'20%', right:'80%'},
               viewerConstructor: {
                   instance: [filtered]
               },
                 autoOpen: ["computed"]
         }
      ];


        algoWidgetObj.addTabs(filesStructureToAdd, "results");
    };
    
    function someCallback (viewer, node, irow)
    {
        console.log("calling from someCallback()")
    };
    
    
};
