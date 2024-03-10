function calculate() {
  // Get form inputs
  var investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
  var timePeriod = parseInt(document.getElementById('timePeriod').value);
  var interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
  var frequency = document.getElementById('frequency').value;

  // Convert annual interest rate to monthly and calculate future value
  var monthlyInterestRate = interestRate / 12;
  var totalMonths = timePeriod * 12;
  var futureValue;

  switch (frequency) {
    case 'monthly':
      futureValue = investmentAmount * ((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);
	  investmentAmount = investmentAmount* totalMonths;
      break;
    case 'quarterly':
      var quarterlyInterestRate = interestRate / 4;
      var totalQuarters = timePeriod * 4;
      futureValue = investmentAmount * ((Math.pow(1 + quarterlyInterestRate, totalQuarters) - 1) / quarterlyInterestRate) * (1 + quarterlyInterestRate);
	  investmentAmount = investmentAmount* totalQuarters;
      break;
    case 'annually':	  
      futureValue = investmentAmount * Math.pow(1 + interestRate, timePeriod);
	  investmentAmount = investmentAmount* timePeriod;
      break;
    default:
      futureValue = 0;
  }

  // Display result
  document.getElementById('result').innerHTML = 'Invested Amount: ' + investmentAmount.toFixed(2) + '<br>Future Value: ' + futureValue.toFixed(2);
  
  
  // Update Chart
  updateChart(investmentAmount, futureValue);
}
function updateChart(investmentAmount, futureValue) {
  if (window.myChart && window.myChart.data && window.myChart.data.datasets) {
    // Update the data of the existing chart
    window.myChart.data.datasets[0].data = [investmentAmount, futureValue];
    window.myChart.update();
  } else {
    // Create a new chart
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Investment Amount', 'Future Value'],
        datasets: [{
          data: [investmentAmount, futureValue],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)', // Red for Investment Amount
            'rgba(54, 162, 235, 0.8)' // Blue for Future Value
          ]
        }]
      },
      options: {
        cutout: '70%', // Adjust the size of the inner circle
        legend: {
          display: false
        }
      }
    });
  }
   var chartContainer = document.getElementById('chartContainer');
   chartContainer.style.display = 'block'; // Display the chart container
  
   // Display the result section
   document.getElementById('result').style.display = 'block';
}




