const fs = require('fs')
const csv = require('csv-parser')
const schedule = [];

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
    })

fs.createReadStream('input.csv')
  .pipe(csv())
  .on('data', function (row) {
    
    const s = {
        date:row.Date,
        start_time: row.S_time,
        end_time: row.E_time,
        comment: row.Comment
    }
    schedule.push(s);
  })
  .on('end', function () {
    readline.question(`Enter the Date(DD-MM-YYYY),start time(XX:YYam/XX:YYpm), end time(XX:YYam/XX:YYpm),comment in the given format!\n`, s => {
        console.log(s)
        let temp = s.split(',');
        const new_schedule = {
            date: temp[0],
            start_time: temp[1],
            end_time: temp[2],
            comment: temp[3]
        }
        schedule.push(new_schedule);
        readline.close()
        writeToCSVFile(schedule)
        })
        
    })


   
    //Writing to output.csv after processing
    function writeToCSVFile(schedule) {
        const filename = 'input.csv';
        fs.writeFile(filename, extractAsCSV(schedule), err => {
          if (err) {
            console.log('Error writing to csv file', err);
          } else {
            console.log(`saved as ${filename}`);
          }
        });
      }
      
      function extractAsCSV(schedule) {
        const header = ["Date,S_time,E_time,Comment"];
        const rows = schedule.map(s =>
           `${s.date},${s.start_time},${s.end_time},${s.comment}`
        );
        return header.concat(rows).join("\n");
      }