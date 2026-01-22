export default class ColumnChart {
      #element = null;
      #data = [];
      #label = '';
      #value = 0;
      #link = '';
      #formatHeading = null;
      #chartHeight = 50;

    constructor({ data, label, value, link, formatHeading } = {}) {
      this.#data = data ?? this.#data;
      this.#label = label ?? this.#label;
      this.#link = link ?? this.#link;
      this.#formatHeading = formatHeading;
      this.#value = value ?? 0;

      this.#element = document.createElement('div');
      this.#element.style = `--chart-height: ${this.#chartHeight}`;
      this.#element.classList.add('column-chart');
      if (this.#data.length === 0) {
          this.#element.classList.add('column-chart_loading');
      }

      this.render();
    }

      set html(content) {
      this.#element.innerHTML = content;
    }

    get element() {
      return this.#element;
    }

    get chartHeight() {
    return this.#chartHeight;
  }

      render() {
            const displayValue = this.#formatHeading
            ? this.#formatHeading(this.#value)
            : this.#value;

            this.#element.innerHTML = `
              <div class="column-chart__title">
                Total ${this.#label}
                ${this.#link ? `<a href="${this.#link}" class="column-chart__link">View all</a>` : ''}
              </div>
              <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                ${displayValue}
                </div>
                <div data-element="body" class="column-chart__chart">
                  ${this.getDataBody()}
                </div>
              </div>
            `;
  }

    getDataBody() {
      if (!this.#data.length) {
        return `<img src='charts-skeleton.svg' alt ='' />`;
      }

      const maxValue = Math.max(...this.#data);
      return this.#data
        .map(value => {
          const percent = Math.round((value / maxValue) * 100);
          const scaledValue = Math.floor(value * this.#chartHeight / maxValue);
          return `<div style="--value: ${scaledValue}" data-tooltip="${percent}%"></div>`;
        })
        .join('');
    }

      update(newData) {
      this.#data = newData;

      if (!newData || newData.length === 0) {
      this.#element.classList.add('column-chart_loading');
    } else {
      this.#element.classList.remove('column-chart_loading');
    }

      this.render();
    }

      remove() {
        this.#element.remove();
      }

      destroy() {
        this.remove();
        this.#element = null;
        this.#data = null;
        this.#label = null;
        this.#value = null;
        this.#link = null;
        this.#formatHeading = null;

        return;
    }
  }


