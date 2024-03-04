import random

from ..logs.logger import Logger
from ..configs.game_config import GameConfig


class GameController:
    def __init__(self, rows):
        self.logger = Logger(name="controller.game").get_logger()
        self.risk_tables = GameConfig().get_risk_tables(rows)
        self.shuffle_array = GameConfig().get_shuffle_array(rows)

    def get_game_result(self, data):
        self.logger.info(f"Bet: {data['bet']}\n"
                         f"Risk: {data['risk']}\n"
                         f"Balls: {data['balls']}\n"
                         f"Rows: {data['rows']}")
        game_data = {
            'balls': data['balls']
        }
        for i in range(data['balls']):
            random.shuffle(self.shuffle_array)
            coefficient = self.risk_tables[data['risk']][self.shuffle_array[0]]
            total = data['bet'] * coefficient
            self.logger.info(f"Coefficient: {coefficient}\n"
                             f"Total: {total}\n")
            result = total - data['bet']
            game_data[str(i+1)] = {
                'id': i+1,
                'coefficient': coefficient,
                'total': total,
                'result': result
            }
        self.logger.info(f"game_data: {game_data}")
        return game_data
