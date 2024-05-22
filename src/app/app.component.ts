import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public redTimer = 5;
  public yellowTimer = 2;
  public greenTimer = 5;
  public showIncorrectCrossing = false;
  public isYellow = false;
  public isRedHor = false;
  public isRedVer = false;
  public specialButtonClicked = false;

  private mainIntervalId: any;
  private yellowIntervalId: any;
  private timeouts: any[] = [];

  public ngOnInit() {
    this.startAutoLights();
  }

  public startAutoLights() {
    console.log("Start Lights");
    const redhorElements = document.querySelectorAll("#red-horizontal");
    const yellowhorElements = document.querySelectorAll("#yellow-horizontal");
    const greenhorElements = document.querySelectorAll("#green-horizontal");

    const redverElements = document.querySelectorAll("#red-vertical");
    const yellowverElements = document.querySelectorAll("#yellow-vertical");
    const greenverElements = document.querySelectorAll("#green-vertical");

    const toggleLights = () => {
      if (!this.specialButtonClicked) {
        //red horizontal on
        redhorElements.forEach((light) => {
          (light as HTMLElement).style.backgroundColor = "red";
        });
        this.isRedVer = false;
        this.isRedHor = true;

        yellowhorElements.forEach((light) => {
          (light as HTMLElement).style.backgroundColor = "black";
        });
        greenhorElements.forEach((light) => {
          (light as HTMLElement).style.backgroundColor = "black";
        });

        //green vertical on
        redverElements.forEach((light) => {
          (light as HTMLElement).style.backgroundColor = "black";
        });
        yellowverElements.forEach((light) => {
          (light as HTMLElement).style.backgroundColor = "black";
        });
        greenverElements.forEach((light) => {
          (light as HTMLElement).style.backgroundColor = "green";
        });

        //all yellow on
        this.timeouts.push(setTimeout(() => {
          redhorElements.forEach((light) => {
            (light as HTMLElement).style.backgroundColor = "black";
          });
          this.isRedHor = false;
          this.isRedVer = true;
          greenhorElements.forEach((light) => {
            (light as HTMLElement).style.backgroundColor = "black";
          });
          yellowhorElements.forEach((light) => {
            (light as HTMLElement).style.backgroundColor = "yellow";
          });

          redverElements.forEach((light) => {
            (light as HTMLElement).style.backgroundColor = "black";
          });
          yellowverElements.forEach((light) => {
            (light as HTMLElement).style.backgroundColor = "yellow";
          });
          greenverElements.forEach((light) => {
            (light as HTMLElement).style.backgroundColor = "black";
          });
          this.isRedVer = false;
          this.isYellow = true;

          this.timeouts.push(setTimeout(() => {
            //green horizontal on
            redhorElements.forEach((light) => {
              (light as HTMLElement).style.backgroundColor = "black";
            });
            yellowhorElements.forEach((light) => {
              (light as HTMLElement).style.backgroundColor = "black";
            });

            greenhorElements.forEach((light) => {
              (light as HTMLElement).style.backgroundColor = "green";
            });

            //red vertical on
            redverElements.forEach((light) => {
              (light as HTMLElement).style.backgroundColor = "red";
            });
            this.isRedVer = true;
            yellowverElements.forEach((light) => {
              (light as HTMLElement).style.backgroundColor = "black";
            });
            greenverElements.forEach((light) => {
              (light as HTMLElement).style.backgroundColor = "black";
            });
            this.isYellow = false;

          }, this.yellowTimer * 1000));
        }, this.redTimer * 1000));
      }
    };

    toggleLights();
    this.mainIntervalId = setInterval(toggleLights, (this.redTimer + this.yellowTimer + this.greenTimer) * 1000);
  }

  public processYellowLights() {
    console.log('yellow');
    this.specialButtonClicked = true;

    // Stop the main interval and clear all timeouts
    clearInterval(this.mainIntervalId);
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    const elements = document.querySelectorAll('.inner');
    this.isRedHor = false;
    this.isRedVer = false;

    const toggleLights = () => {
      this.isYellow = !this.isYellow;
      elements.forEach((light) => {
        (light as HTMLElement).style.backgroundColor = this.isYellow ? "yellow" : "black";
      });
      console.log(this.isYellow)

    };

    this.yellowIntervalId = setInterval(toggleLights, 1000);

    setTimeout(() => {
      this.specialButtonClicked = false;
      clearInterval(this.yellowIntervalId);
      console.log('Stopped blinking and reset to black');

      // Restart main lights
      this.startAutoLights();

    }, 10000);
  }

  public processCrossing() {
    if (this.isYellow) {
      this.showIncorrectCrossing = true;
      setTimeout(() => {
        this.showIncorrectCrossing = false;
      }, 3000);
    } else {
      console.log("crossed");
    }
  }
}
