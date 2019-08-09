from flask import Flask, request, jsonify, render_template
import joblib

# declare constants
HOST = '0.0.0.0'
PORT = 8081 #os.environ.get('PORT')

# initialize flask application
app = Flask(__name__)

# read model
clf = joblib.load('model.pkl').set_params(n_jobs=1)

@app.route('/api/predict', methods=['POST'])
def predict():
    
    # get object from request
    X = request.get_json()
    X = [[float(X['postsittingsystolicbp']), float(X['a_g_ratio']), float(X['albumin']), 
        float(X['creatinine']),float(X['hemoglobin']), float(X['ldh_total']),
        float(X['lymphocytes']), float(X['rbc']),float(X['rdw']),
        float(X['spkt_v_total']),float(X['ufr']),float(X['z_scored_weight'])]]

    # predict
    probabilities = clf.predict_proba(X)

    return jsonify([{'name': 'robust', 'value': round(probabilities[0, 0] * 100, 2)},
                    {'name': 'frail', 'value': round(probabilities[0, 1] * 100, 2)}])

if __name__ == '__main__':
    # run web server
    app.run(host=HOST,debug=True,port=PORT)
    #app.run(debug=True)
